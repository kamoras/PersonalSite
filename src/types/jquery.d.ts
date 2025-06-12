interface WaypointThis {
  element: HTMLElement;
}

interface JQuery {
  waypoint(
    handler: (this: WaypointThis, direction: string) => void,
    options?: { offset: string }
  ): void;
  waypoint(command: 'destroy'): void;
  countTo(options: {
    formatter?: (value: number, options: any) => string;
  }): void;
  flexslider(options?: {
    animation?: string;
    controlNav?: boolean;
  }): void;
  flexslider(command: 'destroy'): void;
}
