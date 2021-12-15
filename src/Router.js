import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Search from "./components/search/search";

function Router() {
   return (
    <BrowserRouter>
    <Switch>
        <Route exact path="/">Nhân Viên</Route>
        <Route path="/room"><div>Phòng</div></Route>
        <Route path="/customer">Khách Hàng</Route>
        <Route path="/service">Dịch Vụ</Route>
        <Route path="/bookingRoom">Đặt Phòng</Route>
        <Route path="/checkoutRoom">Trả Phòng</Route>
        <Route path="/useService">Sử Dụng Dịch Vụ</Route>
        <Route path="/roomRevenue">Doanh Thu Phòng</Route>
        <Route path="/serviceRevenue">Doanh Thu Dịch Vụ</Route>
    </Switch>
    </BrowserRouter>
   )
}

export default Router;