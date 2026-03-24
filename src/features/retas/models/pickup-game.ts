export interface PickupGame {
  id: number;
  title: string;
  description: string;
  fecha_hora: string;
  lugar: string;
  latitude: number;
  longitude: number;
  max_players: number;
  estado: string;
  created_by: number;
  created_at: string;
}

export interface CreatePickupGameRequest {
  title: string;
  description: string;
  fecha_hora: string;
  lugar: string;
  max_players: number;
}
