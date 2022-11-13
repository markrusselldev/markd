import React, { useEffect, useState, createRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { Container, Row, Col, Form, Button, Card, Stack } from "react-bootstrap"
import ReactTooltip from "react-tooltip"
import FileSaver from "file-saver"

function Markd({ content }) {
  const [markdown, setMarkdown] = useState(content)
  const [preview, setPreview] = useState()
  const [markup, setMarkup] = useState()
  const [scroll, setScroll] = useState()
  const scrollRef = createRef()

  const updateMarkdown = e => setMarkdown(e.target.value)
  const updateScroll = e => {
    setScroll(e.target.scrollTop)
    scrollRef.current.scrollTop = scroll * 1.1
  }

  // set page height
  const pageHeight = {
    height: "calc(100vh - 56px)"
  }

  // load demo markdown from file
  const fileName = "demo.md"
  useEffect(() => {
    import(`../assets/${fileName}`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setMarkdown(res))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, []) // run once when rendered

  // run when markdown changes
  useEffect(() => {
    setPreview(markdown)

    // get markup from .markup class, set markup
    const el = document.querySelector(".markup")
    if (el) {
      const HTML = el.innerHTML
      setMarkup(HTML)
    }
  }, [markdown])

  function deleteHandler() {
    setMarkdown("")
  }

  // gfm toggle state
  const [gfm, toggleGfm] = useState(true)
  // syntax highlighting toggle state
  const [syntax, toggleSyntax] = useState(true)

  function toggleHandler(which) {
    switch (which) {
      case "gfm":
        toggleGfm(current => !current)
        return
      case "syntax":
        toggleSyntax(current => !current)
        return
      default:
        return
    }
  }

  // get and format the date and time
  let now = new Date()
  let date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
  let time = now.getHours() + "-" + now.getMinutes() + "-" + now.getSeconds()
  let dateTime = date + "--" + time

  // save markdown using file-saver
  function saveMarkdown() {
    const blob = new Blob([markdown], {
      type: "text/plain;charset=utf-8"
    })
    FileSaver.saveAs(blob, `${dateTime}.md`)
  }

  // save htmml using file-saver
  function saveHTML() {
    const blob = new Blob([markup], {
      type: "text/html;charset=utf-8"
    })
    FileSaver.saveAs(blob, `${dateTime}.html`)
  }

  return (
    <Container style={pageHeight}>
      <Row className="h-100">
        <Col xs={5}>
          <Stack direction="horizontal" gap={3} className="mt-2 mb-1">
            <Button onClick={saveMarkdown} variant="outline-primary" className="btn-sm" data-tip="Save Markdown" data-for="save-md-tooltip" data-type="info">
              <i className="bi bi-save-fill"></i>
            </Button>
            <ReactTooltip id="save-md-tooltip" />
            <Button onClick={deleteHandler} variant="outline-danger" className="ms-auto btn-sm" data-tip="Clear All" data-for="delete-tooltip" data-type="warning">
              <i className="bi bi-x-square-fill"></i>
            </Button>
            <ReactTooltip id="delete-tooltip" />
          </Stack>
          <Row>
            <Form.Control as="textarea" id="editor" placeholder="Enter markdown..." bsPrefix="form-control text-muted" className="bg-dark text-light border-0" style={{ height: "80vh", fontSize: "0.8rem" }} value={markdown} onChange={updateMarkdown} onScroll={updateScroll} />
          </Row>
        </Col>
        <Col xs={7}>
          {/* top level column 2 */}
          <Stack direction="horizontal" gap={3} className="mt-2 text-light">
            <Form.Switch onClick={() => toggleHandler("gfm")} label="Gfm" data-tip="Github Flavored Markdown" data-for="gfm-tooltip" data-type="info" defaultChecked="true" />
            <ReactTooltip id="gfm-tooltip" />
            <Form.Switch onClick={() => toggleHandler("syntax")} label="Code" data-tip="Code Highlighting" data-for="syntax-tooltip" data-type="info" defaultChecked="true" />
            <ReactTooltip id="syntax-tooltip" />
            <Button onClick={saveHTML} variant="outline-primary" className="ms-auto btn-sm" data-tip="Save HTML" data-for="save-html-tooltip" data-type="info">
              <i className="bi bi-save-fill"></i>
            </Button>
            <ReactTooltip id="save-html-tooltip" />
          </Stack>
          <Row>
            <Col className="p-1 mx-1">
              <Card id="preview" className="overflow-scroll" style={{ height: "80vh" }} ref={scrollRef}>
                <Card.Body>
                  <ReactMarkdown children={preview} remarkPlugins={gfm ? [remarkGfm] : []} rehypePlugins={syntax ? [rehypeHighlight] : []} className="markup" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Markd
