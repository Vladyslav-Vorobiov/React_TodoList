import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TodoForm from '../components/TodoForm';
import {useEffect, useState} from 'react';
import TodoItem from "../components/TodoItem";
import Storage from "../utils/Storage";
import withLoader from "../hoc/withLoader";


const HomePage = () => {

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


    const createTodoItem = async todoItem => {
        setIsLoading(true);
        const newState = await Storage.setItem(todoItem);
        setTodoItems(newState);
        setIsLoading(false);
    };

    const toggleCompleted = (id) => async (event) => {
        const status = event.target.checked;
        const newState = await Storage.changeCompletedStatus(id, status);
        setTodoItems(newState);
    };

    const removeTodoItem = (id) => async () => {
        setIsLoading(true);
        const newState = await Storage.removeTodo(id);
        setTodoItems(newState);
        setIsLoading(false);
    };

    const removeAllTodos = () => {
        Storage.clearStorage();
        setTodoItems([]);
    };

    const getTodos = () => (
        todoItems.length ?
            <Row>
                {todoItems.map(
                    ({title, description, id, completed}, index) => (
                        <Col xs={6} lg={4} key={index}>
                            <TodoItem
                                key={index}
                                id={id}
                                title={title}
                                description={description}
                                changeStatus={toggleCompleted}
                                checked={completed}
                                removeTodoItem={removeTodoItem}
                            />
                        </Col>
                    )
                )}
            </Row>
            :
            <p className='text-center fs-5 fw-bold mt-5'>Please create your first task...</p>
    );

    const ItemsContainerWithLoader = withLoader(getTodos, isLoading);

    return (

        <>
            <h2 className='d-none d-md-block text-center mt-5 mb-5 text-uppercase fw-bold'>Todo List</h2>
            <Container>
                <Row>
                    <Col md={4} className="pb-5 pt-4 pb-md-0 pt-md-0">
                        <TodoForm handleCreate={createTodoItem} handleClearStorage={removeAllTodos}/>
                    </Col>
                    <Col md={8}>
                        <ItemsContainerWithLoader/>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomePage;