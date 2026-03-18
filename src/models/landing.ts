export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Role {
  emoji: string;
  title: string;
  description: string;
  capabilities: string[];
  color: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}
