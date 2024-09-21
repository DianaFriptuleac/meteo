import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";

const News = () => {
  const [news, setNews] = useState([]);
  const [expandedArticle, setExpandedArticle] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=meteo&from=2024-08-21&sortBy=publishedAt&apiKey=f4cbd8f553b940e3a1b4b3564d8bd7cd`
      );
      const data = await response.json();
      setNews(data.articles);
    };

    fetchNews();
  }, []);

  const toggleExpand = (index) =>{
    setExpandedArticle(index === expandedArticle ? null: index);
  }
;
  return (
    <Container>
      <Row className="justify-content-center my-3 g-3">
        {news.map((article, index) => (
          <Col sm={12} md={6} lg={3} key={index}>
            <Card className="newsCard h-100 w-100">
              <Card.Img
                className="newsImage"
                variant="top"
                src={article.urlToImage || "https://via.placeholder.com/150"}
              />
              <Card.Body >
                <Card.Title className="text-center" onClick={() => toggleExpand(index)} style={{cursor:"pointer"}}> {expandedArticle === index ? article.title : article.title && article.title.length > 100 ?
                    article.title.substring(0, 100) + "..." : article.title}
                    </Card.Title>
                    
                <Card.Text className="newsDescription" onClick={() => toggleExpand(index)}style={{cursor:"pointer"}}>
                    {expandedArticle === index ? article.description : article.description && article.description.length > 150 ?
                    article.description.substring(0, 150) + "..." : article.description}
                </Card.Text>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Leggi l'articolo completo
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default News;
