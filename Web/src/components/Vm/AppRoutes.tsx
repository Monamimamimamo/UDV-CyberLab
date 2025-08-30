import {Navigate, Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";

import {userStore} from "../../stores";
import {SideMenu} from "../SideMenu/SideMenu";
import {News} from "../News/News";
import {LabWorkPage} from "../LabWork/LabWork";
import {LabWorks} from "../LabWorks/LabWorks";
import { NewsAdd } from "../NewsAdd/NewsAdd";
import {NewsEdit} from "../NewsEdit/NewsEdit";
import {Admin} from "../Admin/Admin";
import {LabSchedule} from "../LabSchedule/LabSchedule";
import {TestList} from "../TestList/TestList/TestList";
import {TestsAdd} from "../TestsAdd/TestsAdd";
import {TestPass} from "../TestPass/TestPass";
import { TestResultItem } from "../TestList/TestResultsItem";


const Protected = observer(({children}: { children: JSX.Element }) => {
    if (!userStore.isLogined) {
        return <Navigate to="/login" replace/>;
    }
    return children;
});

Protected.displayName = "PrivateRoute"

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<Protected><SideMenu/></Protected>}>
                <Route path={"/news"} element={<Protected><News/></Protected>}/>
                <Route path={"/news/add"} element={<Protected><NewsAdd/></Protected>}/>
                <Route path={"/news/:id/edit"} element={<Protected><NewsEdit/></Protected>}/>
                {/* <Route path={"/labs"} element={<Protected><Labs/></Protected>}/>
                <Route path={"/labs/:labId/:id"} element={<Protected><Lab/></Protected>}/> */}
                <Route path={"/admin"} element={<Protected><Admin/></Protected>}/>
                <Route path={"/schedule"} element={<Protected><LabSchedule/></Protected>}/>
                <Route path={"/tests"} element={<Protected><TestList/></Protected>}/>
                <Route path={"/tests/add"} element={<Protected><TestsAdd id={""} name={""} description={""} questions={[]}/></Protected>}/>
                <Route path="/tests/:id/questions" element={<Protected><TestPass/></Protected>}/>
                <Route path="/tests/:id/results" element={<Protected><TestResultItem/></Protected>}/>
                <Route path={"/labs"} element={<Protected><LabWorks/></Protected>}/>
                <Route path={"/labs/:labWorkId/:userId"} element={<Protected><LabWorkPage/></Protected>}/>
                <Route path="*" element={<Navigate to={"/news"} replace/>}/>
            </Route>

        </Routes>
    );
}
