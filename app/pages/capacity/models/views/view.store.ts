import { generateId } from '~/util';
import {
    CapacityViewJson,
    CreateViewDto,
    DeleteCapacityViewDto,
    UpdateCapacityViewDto,
    UpdateCapacityViewNameDto,
    UpdateDefaultCapacityViewDto
} from '@math865a/project-tool.types';
import _ from 'lodash';
import { computed, toJS } from 'mobx';
import { getRoot, Model, model, modelAction, prop } from 'mobx-keystone';
import { CapacityBoard } from '../../_controllers/_board';
import { CapacityView } from './view.model';

@model('capacity-views')
export class CapacityViewsStore extends Model({
    Views: prop<CapacityView[]>(() => [])
}) {

    @computed
    get Transport(){
        return getRoot<CapacityBoard>(this).Transport
    }

    @modelAction
    createView = () => {
        const newNameCount = _.filter(this.Views, (d) =>
            d.name.includes('Ny visning')
        ).length;
        let resources = toJS(this.Filter.RowFilter.rowFilter);
        if (resources.length === 0) {
            resources = this.Filter.RowFilter.sortedRows.map((d) => d.id);
        }
        const dto: CreateViewDto = {
            id: generateId(),
            name:
                newNameCount > 0
                    ? `Ny visning ${newNameCount + 1}`
                    : 'Ny visning',
            resources: resources,
            bookingStages: toJS(this.Filter.BookingStageFilter.filterState),
            order: 1,
            showResourcesWithNoBookings:
                this.Filter.RowFilter.showRowsWithoutBookings,
        };
        const View = this.resolve({ ...dto, isDefault: false });
        this.Transport.createView(dto, 'user1');
        this.View.setView(View);
    };

    @modelAction
    saveName = (id: string, name: string) => {
        const dto: UpdateCapacityViewNameDto = {
            viewId: id,
            name: name,
        };
        this.Transport.updateName(dto, 'user1');
    };

    @modelAction
    updateDefaultView = (id: string, isDefault: boolean) => {
        if (!isDefault) {
            const currentDefault = _.find(
                this.Views,
                (d) => d.id !== id && d.isDefault
            );
            if (currentDefault) {
                currentDefault.setIsDefault(false);
            }
        }
        const dto: UpdateDefaultCapacityViewDto = {
            viewId: id,
            isDefault: isDefault,
        };
        this.Transport.updateDefaultView(dto, 'user1');
    };

    @modelAction
    updateCapacityView = (CapacityView: CapacityView) => {
        let resources = toJS(this.Filter.RowFilter.rowFilter);
        if (resources.length === 0) {
            resources = this.Filter.RowFilter.sortedRows.map((d) => d.id);
        }
        const resourcesToDelete = _.difference(
            CapacityView.resources,
            resources
        );
        const bookingStages = toJS(this.Filter.BookingStageFilter.filterState);
        const bookingStagesToDelete = _.difference(
            CapacityView.bookingStages,
            bookingStages
        );
        const dto: UpdateCapacityViewDto = {
            viewId: CapacityView.id,
            resources: resources,
            bookingStages: bookingStages,
            order: 1,
            showResourcesWithNoBookings:
                this.Filter.RowFilter.showRowsWithoutBookings,
            bookingStagesToDelete: bookingStagesToDelete,
            resourcesToDelete: resourcesToDelete,
        };
        CapacityView.setResources(resources);
        CapacityView.setBookingStages(dto.bookingStages);
        CapacityView.setOrder(1);
        CapacityView.setShowResourcesWithNoBookings(
            dto.showResourcesWithNoBookings
        );
        this.Transport.updateView(dto, 'user1');
    };

    @modelAction
    deleteCapacityView = (CapacityView: CapacityView) => {
        const dto: DeleteCapacityViewDto = {
            viewId: _.clone(CapacityView.id),
        };
        if (this.View.capacityView === CapacityView.id){
            this.View.setView(CapacityView)
        }
        this.Transport.deleteView(dto, 'user1');
        this.Views.splice(_.indexOf(this.Views, CapacityView), 1)
    };

    @computed
    get Filter() {
        return getRoot<CapacityBoard>(this).Filter;
    }

    @computed
    get View() {
        return getRoot<CapacityBoard>(this).View;
    }

    @computed
    get sortedViews() {
        return _.sortBy(this.Views, (d) => d.name);
    }

    @modelAction
    initialize = (jsons: CapacityViewJson[]) => {
        this.resolveMany(jsons);
        const defaultView = this.Views.find((d) => d.isDefault);
        if (defaultView) {
            this.View.setView(defaultView);
        }
    };

    @modelAction
    resolveMany = (jsons: CapacityViewJson[]) => {
        jsons.forEach((json) => this.resolve(json));
    };

    @modelAction
    resolve(json: CapacityViewJson) {
        let Model: CapacityView | undefined = this.Views.find(
            (d) => d.id === json.id
        );
        if (Model) {
            Model.update(json);
        } else {
            Model = new CapacityView(json);
            this.Views.push(Model);
        }
        return Model;
    }
}
