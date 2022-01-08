import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


import EmployeeList from "./components/Employee/EmployeeList";
import Login from "./components/Auth/login";
import Room from "./components/Room/roomList";
import Guest from "./components/Guest/guestList";
import Service from "./components/Service/serviceList";
import BookRoom from "./components/BookRoom/bookRoomList";
import RevenusRoom from "./components/RevenueRoom/revenueRoomList";
import RevenusService from "./components/RevenueService/revenusSeviceList";
import BookService from "./components/BookService/bookServiceList";
function Router() {
   return (
    <BrowserRouter>
    <Switch>
        <Route exact path="/">
          <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
                      <EmployeeList />
              </div>
            </div>
          </div>
        </Route>
        <Route path="/room">
        <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
                      <Room />
              </div>
            </div>
          </div>
        </Route>
        <Route path="/customer">
        <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
                      <Guest />
              </div>
            </div>
          </div>  
        </Route>
        <Route path="/service">
        <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
                      <Service />
              </div>
            </div>
          </div>
        </Route>

        <Route path="/bookingRoom">
        <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
              <BookRoom payBill={true}/>
              </div>
            </div>
          </div>
          </Route>
        <Route path="/checkoutRoom"><BookRoom payBill={false}/></Route>
        <Route path="/useService"><BookService payBill={true}/></Route>
        
        <Route path="/roomRevenue">
        <div className="container-xl">
            <div className="table-responsive">
              <div className="table-wrapper">
              <RevenusRoom payBill={false}/>
              </div>
            </div>
          </div>
        
          
          
          </Route>
        <Route path="/serviceRevenue"><RevenusService payBill={true}/></Route>
        <Route path="/login"><Login/></Route>
    </Switch>
    </BrowserRouter>
   )
}

export default Router;