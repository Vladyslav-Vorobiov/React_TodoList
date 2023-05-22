import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useFormik} from 'formik';
import * as Yup from 'yup';

let formInitialValues = {
    title: '',
    description: ''
};

const formValidationRules = Yup.object({
    title: Yup.string().trim()
        .min(3, 'Must be 3 characters or more')
        .max(50, 'Must be 30 characters or less')
        .required('This field is required'),
    description: Yup.string().trim()
        .min(3, 'Must be 3 characters or more')
        .max(200, 'Must be 200 characters or less')
        .required('This field is required'),
});

const TodoForm = ({handleCreate, handleClearStorage}) => {

    const formik = useFormik({
        initialValues: formInitialValues,
        validationSchema: formValidationRules,
        onSubmit: values => {
            handleCreate(values);
            formik.resetForm();
        }
    });

    return (

        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="todoFormTitle">
                <Form.Label className='fw-bold'>Task title</Form.Label>
                <Form.Control
                    name="title"
                    type="text"
                    placeholder="Enter task title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}/>
                {formik.touched.title && formik.errors.title ? (
                    <div style={{color: "tomato"}}>{formik.errors.title}</div>
                ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="todoFormDescription">
                <Form.Label className='fw-bold'>Task description</Form.Label>
                <Form.Control
                    name="description"
                    as="textarea"
                    placeholder="Enter task description"
                    style={{
                        height: '200px'
                    }}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}/>
                {formik.touched.description && formik.errors.description ? (
                    <div style={{color: "tomato"}}>{formik.errors.description}</div>
                ) : null}
            </Form.Group>
            <div className='d-flex flex-column flex-lg-row justify-content-between flex-wrap gap-3'>
                <Button type="submit" variant="success">Create Task!</Button>
                <Button type="reset" variant="warning" onClick={formik.resetForm}>Clear
                    Form</Button>
                <Button type="button" variant="danger" onClick={handleClearStorage}>Remove All Tasks</Button>
            </div>
        </Form>

    );
};

export default TodoForm;
