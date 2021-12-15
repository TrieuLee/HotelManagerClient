import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Search from "./components/search/search";
import Employee from "./components/Employee/Employee";
import Employeelist from "./components/Employee/EmployeeList";
function Router() {
   return (
    <BrowserRouter>
    <Switch>
        <Route exact path="/">
        <div className="container-xl">
        	<div className="table-responsive">
		        <div className="table-wrapper">
                    <Employeelist/>
                </div>
            </div>
        </div>
        </Route>
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