export interface Invitation {
  id: number;
  equipo_id: number;
  invitador_id: number;
  invitado_id: number | null;
  estado: string;
  tipo: string;
  equipo_nombre: string | null;
  invitador_nombre: string | null;
  created_at: string;
  expires_at: string | null;
}
