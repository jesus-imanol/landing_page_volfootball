import { Feature, Role, Stat, NavLink } from "@/models/landing";

const navLinks: NavLink[] = [
  { label: "Inicio", href: "#hero" },
  { label: "Caracteristicas", href: "#features" },
  { label: "Roles", href: "#roles" },
  { label: "Contacto", href: "#cta" },
];

const features: Feature[] = [
  {
    icon: "🏆",
    title: "Torneos",
    description:
      "Crea y gestiona torneos con formato liga, eliminatoria o mixto. Control total del ciclo de vida: borrador, inscripcion, en curso y finalizado.",
  },
  {
    icon: "💳",
    title: "Pagos en tiempo real",
    description:
      "Cobra inscripciones y arbitraje con seguimiento de estado. Ve quien ha pagado, quien esta pendiente y envia recordatorios.",
  },
  {
    icon: "⚽",
    title: "Arbitros digitales",
    description:
      "Asigna arbitros a partidos, registra goles, tarjetas y sustituciones en vivo. Verificacion de jugadores por QR.",
  },
  {
    icon: "👥",
    title: "Gestion de equipos",
    description:
      "Los capitanes crean equipos, invitan jugadores por codigo o directamente. Roster completo con control de estados.",
  },
];

const roles: Role[] = [
  {
    emoji: "🛡️",
    title: "Administrador de Liga",
    description:
      "Controla toda tu liga desde un dashboard centralizado. Crea torneos, gestiona pagos y supervisa equipos.",
    capabilities: [
      "Crear y publicar torneos",
      "Ver cobros y pagos",
      "Dashboard con estadisticas",
      "Gestionar equipos inscritos",
    ],
    color: "#3DFF72",
  },
  {
    emoji: "⚔️",
    title: "Capitan de equipo",
    description:
      "Administra tu equipo, roster de jugadores y pagos de inscripcion. Tu centro de mando para competir.",
    capabilities: [
      "Crear equipo en una liga",
      "Invitar jugadores al roster",
      "Pagar inscripciones",
      "Ver proximos partidos",
    ],
    color: "#3D9BFF",
  },
  {
    emoji: "🏁",
    title: "Arbitro",
    description:
      "Gestiona partidos en tiempo real. Registra eventos del juego y verifica la identidad de los jugadores.",
    capabilities: [
      "Ver partidos asignados",
      "Registrar goles y tarjetas",
      "Verificar jugadores por QR",
      "Control del marcador en vivo",
    ],
    color: "#FFA502",
  },
  {
    emoji: "🎮",
    title: "Jugador",
    description:
      "Unete a equipos, consulta tus estadisticas y mantente al dia con tus proximos partidos y retas.",
    capabilities: [
      "Unirse a equipos con codigo",
      "Ver invitaciones pendientes",
      "Organizar retas (pickup games)",
      "Notificaciones en tiempo real",
    ],
    color: "#FF4757",
  },
];

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Ligas activas" },
  { value: 10000, suffix: "+", label: "Jugadores registrados" },
  { value: 2000, suffix: "+", label: "Torneos jugados" },
  { value: 98, suffix: "%", label: "Satisfaccion" },
];

export function useLanding() {
  return {
    navLinks,
    features,
    roles,
    stats,
  };
}
