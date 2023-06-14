package ui

import (
	"errors"
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"path"
	"path/filepath"
	"strings"
	"time"
)

type (
	nextjsNode struct {
		h        http.Handler
		catchAll bool // true if this node is a catch-all node
		optional bool // true if this node is an optional catch-all node
		sub      map[string]*nextjsNode
	}

	nextjsRouter struct {
		fsys fs.FS
		root *nextjsNode
	}
)

func (nr *nextjsRouter) serveErrorPage(status int, w http.ResponseWriter, r *http.Request) {
	errorPath := fmt.Sprintf("%d.html", status)

	errorPage, err := nr.fsys.Open(errorPath)
	if err != nil {
		http.Error(w, http.StatusText(status), status)
		return
	}
	defer errorPage.Close()

	w.WriteHeader(status)
	io.Copy(w, errorPage)
}

func (nr *nextjsRouter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fp := strings.Trim(r.URL.Path, "/")
	ext := path.Ext(r.URL.Path)
	if ext != "" { // most likely a static file
		f, err := nr.fsys.Open(fp)
		if errors.Is(err, fs.ErrNotExist) {
			nr.serveErrorPage(http.StatusNotFound, w, r) // no match found, serve 404
			return
		} else if err != nil {
			panic(err)
		}
		defer f.Close()

		http.ServeContent(w, r, fp, time.Time{}, f.(io.ReadSeeker))
		return
	}

	if fp == "" { // root path, serve index.html
		nr.root.h.ServeHTTP(w, r)
		return
	}

	segments := strings.Split(fp, "/")
	node := nr.root
	for i, segment := range segments {
		if child, ok := node.sub[segment]; ok { // check for an exact path match
			node = child
		} else if child, ok := node.sub["[]"]; ok { // check for a parameter match
			node = child
		} else {
			nr.serveErrorPage(http.StatusNotFound, w, r) // no match found, serve 404
			return
		}

		if node.catchAll {
			if i == len(segments)-1 && !node.optional {
				// if the catch-all is the last segment and it's not optional, serve 404
				nr.serveErrorPage(http.StatusNotFound, w, r)
				return
			}
			node.h.ServeHTTP(w, r)
			return
		}
	}

	if node.h == nil { // no handler, serve 404
		nr.serveErrorPage(http.StatusNotFound, w, r)
		return
	}
	node.h.ServeHTTP(w, r)
}

func httpFileHandler(fsys fs.FS, path string) http.Handler {
	f, err := fsys.Open(path)
	if err != nil {
		panic(err)
	}
	f.Close()

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		f, err := fsys.Open(path)
		if err != nil {
			panic(err)
		}
		defer f.Close()

		http.ServeContent(w, r, path, time.Time{}, f.(io.ReadSeeker))
	})
}

func newNextJSRouter(fsys fs.FS) (*nextjsRouter, error) {
	// the root node serves index.html on /
	root := &nextjsNode{
		h:   httpFileHandler(fsys, "index.html"),
		sub: make(map[string]*nextjsNode),
	}
	// walk the filesystem and build the router
	err := fs.WalkDir(fsys, ".", func(fp string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		} else if d.IsDir() {
			return nil
		}

		name := d.Name()
		ext := filepath.Ext(name)

		// only route html files
		if ext != ".html" {
			return nil
		} else if name == "index.html" { // index.html is handled by the root node
			return nil
		}

		name = strings.TrimSuffix(name, ext)
		segments := strings.Split(fp, "/")
		segments = segments[:len(segments)-1] // remove the filename from the path segments

		catchAll := strings.HasPrefix(name, "[[...") || strings.HasPrefix(name, "[...") // a required catch-all will match /foo/bar but not /foo/
		optional := strings.HasPrefix(name, "[[...")                                    // an optional catch-all will match /foo/bar and /foo
		if catchAll {
			// catch-all routes remove the catch-all segment from the path
			name = segments[len(segments)-1]
			segments = segments[:len(segments)-1]
		} else if strings.HasPrefix(name, "[") { // parameterized routes
			name = "[]" // use [] as the parameter name
		}

		// traverse the path segments and build the router
		node := root
		for _, segment := range segments {
			child, ok := node.sub[segment]
			if !ok {
				child = &nextjsNode{
					sub: make(map[string]*nextjsNode),
				}
				node.sub[segment] = child
			}
			if child.catchAll {
				return fmt.Errorf("failed to add route %q: cannot have a catch-all route with children", fp)
			}
			node = child
		}

		child, ok := node.sub[name]
		if !ok {
			child = &nextjsNode{
				sub: make(map[string]*nextjsNode),
			}
		}
		child.h = httpFileHandler(fsys, fp)
		child.catchAll = catchAll
		child.optional = optional

		node.sub[name] = child
		return nil
	})
	if err != nil {
		return nil, err
	}
	return &nextjsRouter{
		root: root,
		fsys: fsys,
	}, nil
}

// Handler returns an http.Handler that serves the UI from the given filesystem.
func Handler(fsys fs.FS) http.Handler {
	router, err := newNextJSRouter(fsys)
	if err != nil {
		panic(err)
	}
	return router
}
