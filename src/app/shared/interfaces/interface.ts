export interface ICards{
  icon: string,
  title: string,
  text: string,
}

export interface IPathGet{
  url: string;
}

export interface IState{
  bookmark: IStateBookmark;
}

export interface IStateBookmark{
  badge: string;
  action: string,
  badges: any,
  model: IModel,
  resultJourney: IResultJourney;
}

export interface IModel{
  origin: string;
  destination: string;
  limit: number;
}

export interface IResultJourney{
  message: string;
  status: string;
  journeys: IJourney[];
}

export interface IJourney{
  flights: IFlight[];
  origin: string;
  destination: string;
  price: number;
}

export interface IFlight{
  transport: ITransport;
  origin: string;
  destination: string;
  price: number;
}

export interface ITransport{
  flightCarrier: string;
  flightNumber: string;
}
