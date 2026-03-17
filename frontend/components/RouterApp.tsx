import React from "react";
import { useContextQuickMeds } from "../provider/ProviderQuickMeds";
import Dashboard from "../page/Dashboard";
import Dosis from "../page/Dosis";
import Historial from "../page/Historial";
import HomePublico from "../page/HomePublico";
import Login from "../page/Login";
import Medicamentos from "../page/Medicamentos";
import Perfil from "../page/Perfil";
import Recordatorios from "../page/Recordatorios";
import Registro from "../page/Registro";

export default function RouterApp() {
    const { pantallaActual } = useContextQuickMeds();

    if (pantallaActual === "Login") {
        return <Login />;
    }

    if (pantallaActual === "Registro") {
        return <Registro />;
    }

    if (pantallaActual === "Dashboard") {
        return <Dashboard />;
    }

    if (pantallaActual === "Medicamentos") {
        return <Medicamentos />;
    }

    if (pantallaActual === "Recordatorios") {
        return <Recordatorios />;
    }

    if (pantallaActual === "Dosis") {
        return <Dosis />;
    }

    if (pantallaActual === "Historial") {
        return <Historial />;
    }

    if (pantallaActual === "Perfil") {
        return <Perfil />;
    }

    return <HomePublico />;
}