import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function pedirPermisosNotificaciones() {
  const settings = await Notifications.getPermissionsAsync();

  if (!settings.granted) {
    await Notifications.requestPermissionsAsync();
  }
}

export async function programarRecordatorioLocal(hora: string, mensaje: string) {
  const partes = hora.split(":");
  const hour = Number(partes[0]) || 0;
  const minute = Number(partes[1]) || 0;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "QuickMeds",
      body: mensaje,
    },
    trigger: {
      hour,
      minute,
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
    },
  });
}
