package ui

import (
	"bytes"
	"fmt"
	"io"
	"io/fs"
	"net"
	"net/http"
	"strings"
	"testing"
	"time"
)

type (
	memFileNode struct {
		name     string
		data     []byte
		children map[string]*memFileNode
	}

	memFile struct {
		node   *memFileNode
		reader io.ReadSeeker
	}
	memFS struct {
		root *memFileNode
	}
)

func (ms *memFileNode) Name() string {
	return ms.name
}

func (ms *memFileNode) Size() int64 {
	return int64(len(ms.data))
}

func (ms *memFileNode) Mode() fs.FileMode {
	return 0
}

func (ms *memFileNode) ModTime() time.Time {
	return time.Time{}
}

func (ms *memFileNode) IsDir() bool {
	return len(ms.children) > 0
}

func (ms *memFileNode) Sys() any {
	return nil
}

func (ms *memFileNode) Info() (fs.FileInfo, error) {
	return ms, nil
}

func (ms *memFileNode) Type() fs.FileMode {
	return 0
}

func (f *memFile) Stat() (fs.FileInfo, error) {
	return f.node, nil
}

func (f *memFile) Read(p []byte) (int, error) {
	return f.reader.Read(p)
}

func (f *memFile) Seek(offset int64, whence int) (int64, error) {
	return f.reader.Seek(offset, whence)
}

func (f *memFile) Close() error {
	return nil
}

func (mf *memFS) traverse(fp string) *memFileNode {
	if fp == "." || fp == "/" {
		return mf.root
	}

	segments := strings.Split(strings.Trim(fp, "/"), "/")
	node := mf.root
	for _, segment := range segments {
		if child, ok := node.children[segment]; ok {
			node = child
		} else {
			/*buf := make([]byte, 1024)
			n := runtime.Stack(buf, false)
			log.Printf("stack trace:\n%s", buf[:n])*/
			return nil
		}
	}
	return node
}

func (mf *memFS) Add(fp string, data []byte) error {
	segments := strings.Split(strings.Trim(fp, "/"), "/")
	node := mf.root
	for _, segment := range segments {
		child, ok := node.children[segment]
		if !ok {
			child = &memFileNode{
				name:     segment,
				children: make(map[string]*memFileNode),
			}
			node.children[segment] = child
		}
		node = child
	}
	node.data = data
	return nil
}

func (mf *memFS) Stat(fp string) (fs.FileInfo, error) {
	node := mf.traverse(fp)
	if node == nil {
		return nil, fs.ErrNotExist
	}
	return node, nil
}

func (mf *memFS) ReadDir(fp string) (children []fs.DirEntry, _ error) {
	node := mf.traverse(fp)
	if node == nil {
		return nil, fs.ErrNotExist
	}
	for _, child := range node.children {
		children = append(children, child)
	}
	return
}

func (mf *memFS) Open(fp string) (fs.File, error) {
	node := mf.traverse(fp)
	if node == nil {
		return nil, fs.ErrNotExist
	}
	return &memFile{
		node:   node,
		reader: bytes.NewReader(node.data),
	}, nil
}

func newMemFS() *memFS {
	return &memFS{
		root: &memFileNode{
			name:     "",
			children: make(map[string]*memFileNode),
		},
	}
}

func TestNextJSRouter(t *testing.T) {
	fs := newMemFS()
	fs.Add("index.html", []byte("index.html"))
	fs.Add("404.html", []byte("404.html"))
	fs.Add("foo.html", []byte("foo.html"))
	fs.Add("foo/bar.html", []byte("foo/bar.html"))
	fs.Add("foo/bar/[bar].html", []byte("foo/bar/[bar].html"))                   // parameterized path
	fs.Add("foo/files/[...key].html", []byte("foo/files/[...key].html"))         // required catch-all
	fs.Add("foo/objects/[[...key]].html", []byte("foo/objects/[[...key]].html")) // optional catch-all
	fs.Add("assets/foo.jpg", []byte("assets/foo.jpg"))

	router, err := newNextJSRouter(fs)
	if err != nil {
		t.Fatal(err)
	}

	listener, err := net.Listen("tcp", ":0")
	if err != nil {
		t.Fatal(err)
	}
	defer listener.Close()

	go http.Serve(listener, router)

	testCases := []struct {
		path     string
		expected string
		status   int
	}{
		{"/noexist", "404.html", http.StatusNotFound},
		{"/assets/foo.jpg", "assets/foo.jpg", http.StatusOK},
		{"/", "index.html", http.StatusOK},
		{"/foo", "foo.html", http.StatusOK},
		{"/foo/", "foo.html", http.StatusOK},
		{"/foo/bar", "foo/bar.html", http.StatusOK},
		{"/foo/bar/", "foo/bar.html", http.StatusOK},
		{"/foo/bar/baz", "foo/bar/[bar].html", http.StatusOK},
		{"/foo/bar/baz/", "foo/bar/[bar].html", http.StatusOK},
		{"/foo/files", "404.html", http.StatusNotFound}, // required catch-all should not match
		{"/foo/files/bar", "foo/files/[...key].html", http.StatusOK},
		{"/foo/files/bar/baz", "foo/files/[...key].html", http.StatusOK},
		{"/foo/files/bar/baz/", "foo/files/[...key].html", http.StatusOK},
		{"/foo/objects", "foo/objects/[[...key]].html", http.StatusOK}, // optional catch-all should match
		{"/foo/objects/bar", "foo/objects/[[...key]].html", http.StatusOK},
		{"/foo/objects/bar/baz", "foo/objects/[[...key]].html", http.StatusOK},
		{"/foo/objects/bar/baz/", "foo/objects/[[...key]].html", http.StatusOK},
	}

	makeRequest := func(path string, status int) ([]byte, error) {
		u := "http://" + listener.Addr().String() + path
		resp, err := http.Get(u)
		if err != nil {
			return nil, fmt.Errorf("error making request to %v: %v", u, err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != status {
			return nil, fmt.Errorf("unexpected status code %v, wanted %v", resp.StatusCode, status)
		}

		return io.ReadAll(resp.Body)
	}

	for _, test := range testCases {
		t.Run(strings.TrimPrefix(test.path, "/"), func(t *testing.T) {
			data, err := makeRequest(test.path, test.status)
			if err != nil {
				t.Fatal(err)
			}

			if string(data) != test.expected {
				t.Errorf("expected %v, got %v", test.expected, string(data))
			}
		})
	}
}
