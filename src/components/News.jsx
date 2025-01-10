import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";

const News = () => {
  const [news, setNews] = useState([]);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerms, setSearchTerms] = useState(""); //testo digitato per la ricerca
  const [searchNews, setSearchNews] = useState(""); // filtro della ricerca
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=weather&from=2025-01-01&sortBy=popularity&apiKey=a93973edbd784fbf8ed6d2e06a856d7c`
      );
      const data = await response.json();
      const filterAndSortedArticles = data.articles
        .filter(
          (article) =>
            article.source.name !== "[Removed]" &&
            article.title !== "[Removed]" &&
            article.description !== "[Removed]"
        )
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)); //ordino per data
      setNews(filterAndSortedArticles);
    };

    fetchNews();
  }, []);

  const toggleExpand = (index) => {
    setExpandedArticle(index === expandedArticle ? null : index);
  };
  //Filtro le notizie x la bara di ricerca
  const filterNews = news.filter(
    (article) =>
      article.title.toLowerCase().includes(searchNews.toLowerCase()) ||
      searchNews === ""
  );
  useEffect(() => {
    if (searchNews === "") {
      setCurrentPage(1);
    }
  }, [searchNews]);

  //calcolo gli articoli visibili per pagina corrente
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = filterNews.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filterNews.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <Container>
      {/*bara di ricerca */}
      <Row className="justify-content-center my-3">
        <Col sm={12} md={6} className="d-flex">
          <Form.Control
            type="text"
            placeholder="Cerca news..."
            value={searchTerms} //mostro i dati della ricerca
            onChange={(e) => setSearchTerms(e.target.value)}
            // cerco al enter
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setSearchNews(searchTerms);
                setSearchTerms(""); //svuoto il campo
                setCurrentPage(1); //resetto la prima pagina
              }
            }}
          />
          <Button
            className="ms-2 d-inline-flex align-items-center"
            onClick={() => {
              setSearchNews(searchTerms);
              setSearchTerms(""); //svuoto il campo
              setCurrentPage(1); //resetto la prima pagina
            }}
          >
            <i className="bi bi-search me-1"></i> Cerca
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center my-3 g-3">
        {currentArticles.map((article, index) => (
          <Col sm={12} md={6} lg={3} key={index}>
            <Card className="newsCard h-100 w-100">
              <Card.Img
                className="newsImage"
                variant="top"
                src={article.urlToImage || "https://via.placeholder.com/150"}
              />
              <Card.Body>
                <Card.Title
                  className="text-center"
                  onClick={() => toggleExpand(index)}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  {expandedArticle === index
                    ? article.title
                    : article.title && article.title.length > 100
                    ? article.title.substring(0, 100) + "..."
                    : article.title}
                </Card.Title>

                <Card.Text
                  className="newsDescription"
                  onClick={() => toggleExpand(index)}
                  style={{ cursor: "pointer" }}
                >
                  {expandedArticle === index
                    ? article.description
                    : article.description && article.description.length > 150
                    ? article.description.substring(0, 150) + "..."
                    : article.description}
                </Card.Text>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Leggi l'articolo completo
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/*Paginazione */}
      <Row className="justify-content-center mb-2">
        <Col sm={12} className="d-flex justify-content-between">
          <Button
            className="pageButton border-0"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Back
          </Button>
          <Button
            className="pageButton border-0"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default News;
