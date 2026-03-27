export interface Notificacion {
  id: number;
  usuario_id: number;
  tipo: string;
  titulo: string;
  mensaje: string;
  icono: string;
  referencia_tipo?: string;
  referencia_id?: number | null;
  leida: boolean;
  created_at: string;
}

export interface NotificacionesResponse {
  hoy: Notificacion[];
  esta_semana: Notificacion[];
  anteriores: Notificacion[];
  no_leidas: number;
}
