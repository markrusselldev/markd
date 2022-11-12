import React, { useEffect } from "react"
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"

function Layout() {
  const pageHeight = {
    height: "calc(100vh - 56px)"
  }

  return (
    // based on this earlier design
    // <div className="Marked">
    //   <textarea id="editor" className="Markdown-editor" value={markdown} onChange={updateMarkdown} onScroll={updateScroll} />
    //   <div id="preview" className="Markdown-preview" ref={scrollRef}>
    //     <ReactMarkdown children={preview} remarkPlugins={[remarkGfm]} />
    //   </div>
    // </div>

    <Container style={pageHeight}>
      <Row className="h-100">
        <Col xs={12} md={5} className="">
          <Row>
            <Col className="text-end p-1 my-1">
              <Button className="btn btn-danger btn-sm">
                <i className="bi bi-trash3-fill"></i>
              </Button>
            </Col>
          </Row>
          <Row style={{ height: "89%" }}>
            {/* <Form.Control
              as="textarea"
              id="editor"
              placeholder="You're learing React!!!"
              bsPrefix="form-control text-muted"
              className="bg-dark text-light border-0"
              value={markdown} 
              onChange={updateMarkdown} 
              onScroll={updateScroll}
            /> */}
          </Row>
        </Col>
        <Col xs={12} md={7} className="">
          <Row>
            <Col className="p-1 mt-2 ms-2 text-light">
              <Form.Switch label="Gfm" />
            </Col>
          </Row>
          <Row style={{ height: "90%" }}>
            <Col className="p-1 mx-1">
              {/* <Card id="preview" className="overflow-scroll" style={{ height: "100%" }} ref={scrollRef}>
                <Card.Body><ReactMarkdown children={preview} remarkPlugins={[remarkGfm]} /></Card.Body>
              </Card> */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

//export default Layout
