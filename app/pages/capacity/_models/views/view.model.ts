import { CapacityViewJson } from '@math865a/project-tool.types';
import _ from 'lodash';
import { computed } from 'mobx';
import {
    getRoot,
    idProp,
    Model,
    model,
    modelAction,
    prop,
} from 'mobx-keystone';
import { CapacityBoard } from '../../_controllers/_board';

@model('capacity-view')
export class CapacityView extends Model({
    id: idProp.typedAs<string>(),
    name: prop<string>().withSetter(),
    resources: prop<string[]>().withSetter(),
    bookingStages: prop<string[]>().withSetter(),
    order: prop<1 | -1>().withSetter(),
    isDefault: prop<boolean>().withSetter(),
    showResourcesWithNoBookings: prop<boolean>().withSetter(),
}) {
    @modelAction
    updateName = (name: string) => {
        this.setName(name);
        this.Store.saveName(this.id, name);
    };

    @modelAction
    toggleDefault = () => {
        const wasDefault = _.clone(this.isDefault);
        this.setIsDefault(!this.isDefault);
        this.Store.updateDefaultView(this.id, wasDefault);
    };

    @modelAction
    toggle = () => {
        this.View.setView(this);
    };

    @modelAction
    delete(){
        this.Store.deleteCapacityView(this)
    }

    @computed
    get RowStore() {
        return getRoot<CapacityBoard>(this).RowStore;
    }

    @computed
    get Store() {
        return getRoot<CapacityBoard>(this).CapacityViewStore;
    }

    @computed
    get View() {
        return getRoot<CapacityBoard>(this).View;
    }

    @computed
    get Filter() {
        return getRoot<CapacityBoard>(this).Filter;
    }

    @computed
    get Rows() {
        return _.sortBy(
            this.RowStore.Resources.filter((d) =>
                this.resources.includes(d.id)
            ),
            (d) => d.name
        );
    }

    @computed
    get isActive(): boolean {
        return this.View.CapacityView === this;
    }

    @computed
    get hasChanged() {
        if (!this.isActive) return false;
        return (
            _.xor(this.Filter.RowFilter.rowFilter, this.resources).length > 0 ||
            _.xor(
                this.Filter.BookingStageFilter.filterState,
                this.bookingStages
            ).length > 0 ||
            this.Filter.RowFilter.showRowsWithoutBookings !==
                this.showResourcesWithNoBookings
        );
    }

    @modelAction
    update(json: CapacityViewJson) {}
}
