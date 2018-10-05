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
    scope: string,
    validation: {
      openAPIV3Schema: {
        properties: {
          spec: {
            properties: {
              replicas: {
                type: string,
                maximum: number,
                minimum: number
              }
            }
          }
        }
      }
    }
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

