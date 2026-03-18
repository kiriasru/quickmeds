export type PantallaPublica = "HomePublico" | "Login" | "Registro";

export type PantallaPrivada =
    | "Dashboard"
    | "Medicamentos"
    | "Recordatorios"
    | "Dosis"
    | "Historial"
    | "Perfil";

export type PantallaApp = PantallaPublica | PantallaPrivada;