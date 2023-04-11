import _ from "lodash";

export interface IServiceMap {
    http: {
        authentication: string;
        contracts: string;
        financialSources: string;
        resources: string;
        resourceTypes: string;
        users: string;
        accessGroups: string;
        workpackages: string;
        userService: string;
        capacityBoard: string;
        projectManager: string;
        schedule: string;
        resourcePortfolio: string;
    };
    gateways: {
        capacityBoard: string;
        projectManagement: string;
        resourceCapacity: string;
        userService: string;
    };
}

let serviceMap: IServiceMap = getServiceMap();
let serviceDomain: string = getServerDomain();

function getServerDomain() {
    const domain = process.env.SERVER_DOMAIN;
    if (domain) {
        return domain;
    }
    throw new Error("No server domain found.");
}

function getServiceMap() {
    const api = {
        http: {
            projectManager: "project-manager",
            authentication: "authentication",
            contracts: "contracts",
            financialSources: "financialsources",
            resources: "resources",
            resourceTypes: "resourcetypes",
            users: "users",
            accessGroups: "access-groups",
            workpackages: "workpackages",
            userService: "user-service",
            capacityBoard: "capacity-board",
            schedule: "schedule",
            resourcePortfolio: "resource-portfolio"
        },
        gateways: {
            capacityBoard: "capacity-board",
            projectManagement: "project-management",
            resourceCapacity: "resource-capacity",
            userService: "user-service",
        },
    };

    if (
        _.values(api.http).some((x) => x === undefined) ||
        _.values(api.gateways).some((x) => x === undefined)
    ) {
        throw new Error("Missing environment variable for service map.");
    }
    return api as IServiceMap;
}

const services = _.mapValues(serviceMap.http, (x) => serviceDomain + "/" + x);

export function getServiceUrl(
    service: keyof typeof services,
    subPath?: string,
    id?: string
) {
    let url = services[service];
    if (subPath) {
        url += "/" + subPath;
    }
    if (id) {
        url += "/" + id;
    }
    return url;
}

export const namespaces = _.mapValues(
    serviceMap.gateways,
    (x) => "http://100.64.100.70:5000/" + x
);
