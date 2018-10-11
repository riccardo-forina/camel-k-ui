export interface ICustomResourceDefinition {
  metadata: {
    name: string,
    selfLink: string,
    uid: string,
    resourceVersion: string,
    generation: number,
    creationTimestamp: string
  },
  spec: {
    group: string,
    version: string,
    names: {
      plural: string,
      singular: string,
      kind: string,
      listKind: string,
    },
    scope: string
  },
  status: {
    conditions: Array<{
      type: string,
      status: string,
      lastTransitionTime: string,
      reason: string,
      message: string,
    }>,
    acceptedNames: {
      plural: string,
      singular: string,
      kind: string,
      listKind: string,
    }
  }
}

export interface ICustomResource {
  apiVersion: string;
  kind: string;
  metadata: any,
  spec: any,
  status: {
    phase: string;
    version: string;
  }
}


export interface IProject {
  apiVersion: string;
  kind: string;
  metadata: any,
  spec: any,
  status: {
    phase: string;
    version: string;
  }
}

