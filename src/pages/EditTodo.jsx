import {useNavigate, useParams} from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Storage from '../utils/Storage';
import React, {useEffect, useState} from "react";
import EditTodoForm from "../components/EditTodoForm";
import Col from "react-bootstrap/Col";
import withLoader from "../hoc/withLoader";

const EditTodo = () => {
    const {id} = useParams();
    const [singleItem, setSingleItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        const fetchData = async () => {
            const dataFromStorage = await Storage.getItems();
            const item = dataFromStorage.find((item) => item.id === +id);
            setSingleItem(item);
            setIsLoading(false);
        };

        fetchData();
    }, [id]);

    const navigate = useNavigate();

    const redirectHome = () => {
        navigate('/');
    };

    const saveChanges = async ({...values}) => {
        setIsLoading(true)
        const newState = await Storage.saveEditedTodo({...values});
        setSingleItem(newState);
        setIsLoading(false)
        redirectHome();
    };

    const EditFormWithLoader = withLoader(EditTodoForm, isLoading)

    return (
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col xs={12} md={8} xl={4}>
                        <h3 className="text-center fw-bold mb-4 mt-4">Edit Todo Item #{id}</h3>
                        <EditFormWithLoader item={singleItem} handleCancel={redirectHome} handleSave={saveChanges}/>
                    </Col>
                </Row>
            </Container>
    );
};

export default EditTodo;