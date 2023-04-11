import { CapacityBoardRows, ResourceRowJson, ResourceTypeRowJson } from '@math865a/project-tool.types';
import _ from 'lodash';
import { computed } from 'mobx';
import { getRoot, Model, model, modelAction, prop } from 'mobx-keystone';
import { CapacityBoard } from '../../_controllers/_board';
import { ResourceRow } from './resource-row.model';
import { ResourceTypeRow } from './resourcetype-row.model';


@model('row-store')
export class RowStore extends Model({
    Resources: prop<ResourceRow[]>(() => []),
    ResourceTypes: prop<ResourceTypeRow[]>(() => []),
}) {
    @computed
    get Transport(){
        return getRoot<CapacityBoard>(this).Transport
    }

    @modelAction
    updateRows(dto: CapacityBoardRows) {
        this.resolveResourceRows(dto.resources);
        this.resolveResourceTypeRows(dto.resourceTypes);
    }


    @modelAction
    resolveResourceRows(jsons: ResourceRowJson[]) {
        jsons.forEach((json) => this.resolveResourceRow(json));
    }

    @modelAction
    resolveResourceRow(json: ResourceRowJson) {
        let Row: ResourceRow | undefined = _.find(
            this.Resources,
            (d) => d.id === json.id
        );
        if (Row) {
            Row.update(json);
        } else {
            Row = new ResourceRow(json);
            this.Resources.push(Row);
        }
    }

    @modelAction
    resolveResourceTypeRows(jsons: ResourceTypeRowJson[]) {
        jsons.forEach((json) => this.resolveResourceTypeRow(json));
    }

    @modelAction
    resolveResourceTypeRow(json: ResourceTypeRowJson) {
        let Row: ResourceTypeRow | undefined = _.find(
            this.ResourceTypes,
            (d) => d.id === json.id
        );
        if (Row) {
            Row.update(json);
        } else {
            Row = new ResourceTypeRow(json);
            this.ResourceTypes.push(Row);
        }
    }
}
