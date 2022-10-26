import "./style/Cotizar.css";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { writeUserData, removeData } from "../../firebase";
import "../../../src/pages/home/home.scss";
export function Cotizar() {
  const [montoDePrestamo, setMontoDePrestamo] = useState(null)
  const [plazoEnMeses, setPlazoEnMeses] = useState(null)  
  const [tasaDeinteresAnual, setTasaDeinteresAnual] = useState(null)
  const [interesMensual, setInteresMensual] = useState(0)
  const [cotaMensual, setCotaMensual] = useState(0)


  const Guardar = (e) => {
    e.preventDefault()
    if (
      e.target.form[0].value.length < 3 || e.target.form[1].value.length < 3 ||
      e.target.form[2].value.length < 3 || e.target.form[3].value.length < 3 ) {
      console.log('error')
      return
    }
    const object = {
      nombreDeLaPropiedad: e.target.form[0].value,
      ingresoMensual: e.target.form[1].value,
      precioDeVenta: e.target.form[2].value,
      abonoInicial: e.target.form[3].value,
      montoDePrestamo: e.target.form[4].value,
      tasaDeinteresAnual: e.target.form[5].value,
      plazoEnMeses: e.target.form[6].value,
      tipoDePropiedad: e.target.form[7].value,
      propositoDeCompra: e.target.form[8].value,
      estadoMigratorio: e.target.form[9].value,
    }
    writeUserData(object)
  }

  const calculoDeCotaMensual = (e) => {
    e.preventDefault()
    const p = e.target.form[4].value // montoDePrestamo
    const n = e.target.form[6].value    // plazoEnMeses
    const tasaDeinteresAnual00 = e.target.form[5].value  //
    const i = tasaDeinteresAnual00 / (360 * 12 / 365)
    const cotaMes = p / ((1 - Math.pow((1 + i), -n)) / i)

    setMontoDePrestamo(e.target.form[4].value)
    setPlazoEnMeses(e.target.form[6].value)
    setTasaDeinteresAnual(e.target.form[5].value)

    setInteresMensual(i)
    setCotaMensual(cotaMes)

  }

  const remove = (e) => {
    e.preventDefault() 
    removeData()
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <div className="container" class="Cotizar">
            <div className="m-3 text-xl text-gray-900 font-semibold">
              <div className="">
                <div className="col-md-16">
                  <h2 className="text-center mb-4">
                    Cotiza tu hipoteca, completa todos los campos para conocer cual sera tu letra aproximada
                  </h2>
                  <hr />
                  <br />
                  <br />

                  <p className="text-center mb-4">
                    DEBERA LLENAR TODOS LOS CAMPOS SI DESEA COTIZAR
                  </p>
                  <div className="card border-0">
                    <form className="m-2" >
                      <div className="card card-body shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <div className="my-flex p-5 form-group ">
                          <input
                            type="text"
                            name="dato2"
                            className="border-secondary form-control mb-3 text-center"
                            placeholder="Nombre de la propiedad"
                          ></input>
                          <input
                            type="text"
                            name="dato2"
                            className="border-secondary form-control mb-3 text-center"
                            placeholder="Ingreso Mensual"
                          ></input>
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control mb-3 text-center"
                            placeholder="Precio de Venta"
                          ></input>
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control mb-3 text-center"
                            placeholder="Abono Inicial"
                          ></input>
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control mb-3 text-center"
                            placeholder="Monto de prestamo"
                          ></input>
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control mb-3 text-center"
                            placeholder="Tasa de interes anual"
                          ></input>
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control mb-3 text-center"
                            placeholder="Plazo en meses"
                          ></input>
                          <div></div>
                          <label for="cars">Tipo de propiedad</label><br />
                          <select className="border-secondary rounded-1 p-1" id="cars" name="cars">
                            <option value="volvo">Seleccione su tipo de propiedad</option>
                            <option value="saab">Saab</option>
                            <option value="fiat">Fiat</option>
                            <option value="audi">Audi</option>
                          </select><br />
                          <label for="cars">Proposito de compra</label><br />
                          <select className="border-secondary rounded-1 p-1" id="cars" name="cars">
                            <option value="volvo">Seleccione su Proposito de compra</option>
                            <option value="saab">Saab</option>
                            <option value="fiat">Fiat</option>
                            <option value="audi">Audi</option>
                          </select><br />
                          <label for="cars">Estado Migratorio</label><br />
                          <select className=" rounded-1 p-1" id="cars" name="cars">
                            <option value="volvo">Seleccione su Estado Migratorio</option>
                            <option value="saab">Saab</option>
                            <option value="fiat">Fiat</option>
                            <option value="audi">Audi</option>
                          </select>
                        </div>
                        <button className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5" onClick={calculoDeCotaMensual}>Cotizar</button>
                {montoDePrestamo && plazoEnMeses && tasaDeinteresAnual &&        
                <div className={"container card card-body shadow"}>
                  <div className="row"> 
                  <div className="col-4 text-center">
                      <span>Total a financiar: </span> <br /><span>{montoDePrestamo}</span>
                    </div>
                    <div className="col-4 text-center">
                      <span>Meses de financiamiento: </span> <br /><span>{plazoEnMeses}</span>
                    </div>
                    <div className="col-4 text-center">
                      <span>Abono Inicial: </span> <br /><span>{Math.round(cotaMensual * 100) / 100} </span>
                    </div>
                    <div className="col-4 text-center">
                      <span>Tasa de interes mensual: </span> <br /><span>{Math.round(interesMensual * 100) / 100} </span>
                    </div>
                    <div className="col-4 text-center">
                      <span>Pago mensual: </span> <br /><span>{Math.round(cotaMensual * 100) / 100} </span>
                    </div>
                  </div>
                  </div>}
                  <br />
                        <button className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5" onClick={Guardar}>Guardar</button> 
                                         <br />
                        <button className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5" onClick={remove}>Eliminar toda la base de datos</button>

                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="charts"></div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
        </div>
      </div>
    </div>
  );
}

export default Cotizar;