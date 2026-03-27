export interface LoginRequest {
  correo: string;
  password: string;
}

export interface RegisterRequest {
  nombre_completo: string;
  correo: string;
  password: string;
  rol_id?: number;
}

export interface AuthResponse {
  token: string;
  data: {
    usuario_id: number;
    nombre_completo: string;
    correo: string;
    rol_id: number;
    foto_perfil_url?: string;
  };
}
