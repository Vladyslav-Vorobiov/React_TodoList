import Container from "react-bootstrap/Container";
import Storage from "../utils/Storage";
import {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import withLoader from "../hoc/withLoader";

const AllTodos = () => {

    const [todoItems, setTodoItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            let dataFromStorage = [];

            try {
                dataFromStorage = await Storage.getItems();
            } catch (e) {
                console.warn(`An error has occurred. Details: ${e.message}`);
            }

            if (Array.isArray(dataFromStorage) && dataFromStorage.length) {
                setTodoItems(dataFromStorage);
            }

            setIsLoading(false);
        };

        fetchData();
    }, []);

    const getAllTodos = () => (
        todoItems.length ?
            <Row>
                {todoItems.map(
                    ({title, description}, index) => (
                        <Col xs={6} lg={4} key={index}>
                            <div className="taskWrapper">
                                <div className="taskHeading fw-bold">{title}</div>
                                <hr/>
                                <div className="taskDescription">{description}</div>
                            </div>
                        </Col>
                    )
                )}
            </Row>
            :
            <h5>No tasks to do yet...</h5>
    );

    const AllTodosWithLoader = withLoader(getAllTodos, isLoading);

    return (
        <Container>
            <h2 className="mb-5 mt-5 text-center text-uppercase fw-bold"> All Todos </h2>
            <AllTodosWithLoader/>
        </Container>
    );
};

export default AllTodos;