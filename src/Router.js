import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Search from "./components/search/search";

function Router() {
   return (
    <BrowserRouter>
    <Switch>
        <Route exact path="/">Trang Chủ</Route>
        <Route path="/types"><div>Thể Loại Âm Nhạc</div></Route>
        <Route path="/playlist">playlist</Route>
        <Route path="/users">Thông tin cá nhân</Route>
        <Route path="/login">Đăng Nhập</Route>
        <Route path="/register">Đăng Xuất</Route>
        <Route path="/aboutUs">Về chúng tôi</Route>
    </Switch>
    </BrowserRouter>
   )
}

export default Router;