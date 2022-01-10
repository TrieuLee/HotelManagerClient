import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";


import EmployeeList from "./components/Employee/EmployeeList";
import Login from "./components/Auth/login";
import Room from "./components/Room/roomList";
import Guest from "./components/Guest/guestList";
import Service from "./components/Service/serviceList";
import BillRoom from "./components/BillRoom/billRoomList";
import BillService from "./components/BillService/billServiceList";
import BookRoom from "./components/BookRoom/bookRoom";
import BookService from "./components/BookService/bookService";
import CheckOutRoom from "./components/CheckoutRoom/checkoutRoomList";
import CheckOutService from "./components/CheckoutService/checkoutServiceList";
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

            <Route path="/bookingRoom"><BookRoom/></Route>
            <Route path="/checkoutRoom"><CheckOutRoom/></Route>
            <Route path="/bookingService"><BookService/></Route>
            <Route path="/checkoutService"><CheckOutService/></Route>
            
            <Route path="/roomRevenue">
              <div className="container-xl">
                  <div className="table-responsive">
                    <div className="table-wrapper">
                    <BillRoom payBill={true}/>
                    </div>
                  </div>
              </div>
          </Route>
            <Route path="/serviceRevenue">
            <div className="container-xl">
                  <div className="table-responsive">
                    <div className="table-wrapper">
                    <BillService payBill={true}/>
                    </div>
                  </div>
              </div>
            </Route>
            <Route path="/login"><Login/></Route>
        </Switch>
    </BrowserRouter>
   )
}

export default Router;