import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function pedirPermisosNotificaciones() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function programarRecordatorioLocal(
  horaRecordatorio: string,
  mensaje: string
) {
  const permitido = await pedirPermisosNotificaciones();

  if (!permitido) return null;

  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "QuickMeds",
      body: mensaje,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
      repeats: false,
    },
  });
}