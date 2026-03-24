export interface Notificacion {
  id: number;
  usuario_id: number;
  tipo: string;
  titulo: string;
  mensaje: string;
  icono: string;
  leida: boolean;
  created_at: string;
}
