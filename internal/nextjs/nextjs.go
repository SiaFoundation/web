package nextjs

import (
	"fmt"
	"io"
	"io/fs"
	"net/http"
	"path"
	"strings"
	"time"
)

type (
	// A node is a single node in the router tree.
	node struct {
		h        http.Handler
		catchAll bool // true if this node is a catch-all node
		optional bool // true if this node is an optional catch-all node
		sub      map[string]node
	}

	// A Router is an HTTP request handler built to serve nextjs applications.
	Router struct {
		fsys fs.FS
		root node
	}
)

func (r *Router) serveErrorPage(status int, w http.ResponseWriter) {
	errorPath := fmt.Sprintf("%d.html", status)

	errorPage, err := r.fsys.Open(errorPath)
	if err != nil {
		http.Error(w, http.StatusText(status), status)
		return
	}
	defer errorPage.Close()

	w.WriteHeader(status)
	io.Copy(w, errorPage)
}

// ServeHTTP implements the http.Handler interface.
func (r *Router) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	fp := strings.Trim(req.URL.Path, "/")
	ext := path.Ext(req.URL.Path)
	if ext != "" { // most likely a static file
		f, err := r.fsys.Open(fp)
		if err == nil {
			defer f.Close()
			http.ServeContent(w, req, fp, time.Time{}, f.(io.ReadSeeker))
			return
		}
	}

	if fp == "" { // root path, serve index.html
		r.root.h.ServeHTTP(w, req)
		return
	}

	segments := strings.Split(fp, "/")
	node := r.root
	for i, segment := range segments {
		if child, ok := node.sub[segment]; ok { // check for an exact path match
			node = child
		} else if child, ok := node.sub["[]"]; ok { // check for a parameter match
			node = child
		} else {
			r.serveErrorPage(http.StatusNotFound, w) // no match found, serve 404
			return
		}

		if node.catchAll {
			if i == len(segments)-1 && !node.optional {
				// if the catch-all is the last segment and it's not optional, serve 404
				r.serveErrorPage(http.StatusNotFound, w)
				return
			}
			node.h.ServeHTTP(w, req)
			return
		}
	}

	if node.h == nil { // no handler, serve 404
		r.serveErrorPage(http.StatusNotFound, w)
		return
	}
	node.h.ServeHTTP(w, req)
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

func traverse(fs fs.ReadDirFS, fp string, segments []string, parent *node) error {
	dir, err := fs.ReadDir(fp)
	if err != nil {
		return fmt.Errorf("failed to read directory %q: %w", strings.Join(segments, "/"), err)
	}

	for _, child := range dir {
		childPath := path.Join(fp, child.Name())
		name := child.Name()
		ext := path.Ext(name)
		name = strings.TrimSuffix(name, ext)

		if !child.IsDir() && ext != ".html" {
			continue
		}

		// add the route to the parent node
		switch {
		case strings.HasPrefix(name, "[[..."): // optional catch-all, ignore the remaining segments
			parent.optional = true
			parent.catchAll = true
			parent.h = httpFileHandler(fs, childPath)
			if len(parent.sub) != 0 {
				return fmt.Errorf("failed to add catch-all route %q: parent has children", fp)
			}
			return nil
		case strings.HasPrefix(name, "[..."): // required catch-all, ignore the remaining segments
			parent.catchAll = true
			parent.h = httpFileHandler(fs, childPath)
			if len(parent.sub) != 0 {
				return fmt.Errorf("failed to add required catch-all route %q: parent has children", fp)
			}
			return nil
		case strings.HasPrefix(name, "["): // parameterized path
			name = "[]"
		}

		// files may share the same name as a directory, so we need to check if the node already exists
		childNode, ok := parent.sub[name]
		if !ok {
			childNode = node{
				sub: make(map[string]node),
			}
		}

		if !child.IsDir() {
			if childNode.h != nil {
				return fmt.Errorf("failed to add route %q: route already exists", childPath)
			}
			childNode.h = httpFileHandler(fs, childPath)
		}

		if child.IsDir() {
			if err := traverse(fs, childPath, append(segments, name), &childNode); err != nil {
				return err
			}
		}

		parent.sub[name] = childNode
	}
	return nil
}

// NewRouter creates a new Router instance with the given fs.FS.
func NewRouter(fs fs.ReadDirFS) (*Router, error) {
	// the root node serves index.html on /
	root := node{
		h:   httpFileHandler(fs, "index.html"),
		sub: make(map[string]node),
	}

	if err := traverse(fs, ".", nil, &root); err != nil {
		return nil, err
	}

	return &Router{
		root: root,
		fsys: fs,
	}, nil
}
