import React, { useEffect, useState, createRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"
import ReactTooltip from "react-tooltip"

//My components

function Markd({ content }) {
  const fileName = "demo.md"
  const [markdown, setMarkdown] = useState(content)
  const [preview, setPreview] = useState()
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
  useEffect(() => setPreview(markdown), [markdown])

  function deleteHandler() {
    setMarkdown("")
  }

  // gfm toggle state
  const [gfm, toggleGfm] = useState(false)

  function gfmHandler() {
    toggleGfm(current => !current)
  }

  return (
    <Container style={pageHeight}>
      <Row className="h-100">
        <Col xs={12} md={5}>
          <Row>
            <Col className="text-end p-1 my-1">
              <Button onClick={deleteHandler} className="btn btn-danger btn-sm" data-tip="Clear Contents" data-for="delete-tooltip" data-type="warning">
                <i className="bi bi-trash3-fill"></i>
              </Button>
              <ReactTooltip id="delete-tooltip" />
            </Col>
          </Row>
          <Row>
            <Form.Control as="textarea" id="editor" placeholder="Enter markdown here..." bsPrefix="form-control text-muted" className="bg-dark text-light border-0" style={{ height: "80vh", fontSize: "0.8rem" }} value={markdown} onChange={updateMarkdown} onScroll={updateScroll} />
          </Row>
        </Col>
        <Col xs={12} md={7}>
          <Row>
            <Col className="p-1 mt-2 ms-2 text-light">
              <Form.Switch onClick={gfmHandler} label="Gfm" data-tip="Github flavored markdown" data-for="gfm-tooltip" data-type="info" />
              <ReactTooltip id="gfm-tooltip" />
            </Col>
          </Row>
          <Row>
            <Col className="p-1 mx-1">
              <Card id="preview" className="overflow-scroll" style={{ height: "80vh" }} ref={scrollRef}>
                <Card.Body>
                  <ReactMarkdown children={preview} remarkPlugins={gfm ? [remarkGfm] : []} /> {console.log(scroll)}
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
