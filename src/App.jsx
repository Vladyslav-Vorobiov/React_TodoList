import Header from "./components/Header";
import Footer from "./components/Footer";
import {Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import EditTodo from "./pages/EditTodo";
import AllTodos from "./pages/AllTodos";
import Error from "./pages/Error";


function App() {
    return (
        <>
            <Header/>

            <main className="pb-5">

                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="edit-todo/:id" element={<EditTodo />}/>
                    <Route path="all-todos" element={<AllTodos />}/>
                    <Route path="*" element={<Error />}/>
                </Routes>

            </main>

            <Footer/>
        </>

    );
}

export default App;
