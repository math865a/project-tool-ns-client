import _ from 'lodash';
import { computed } from 'mobx';
import { getParent, getRoot, Model, model, prop } from 'mobx-keystone';
import { CapacityBoard } from '../../_controllers/_board';
import { Capacity } from './capacity.model';

@model('capacity-style')
export class CapacityStyle extends Model({
    isHovering: prop<boolean>(false).withSetter(),
}) {
    @computed
    get Parent() {
        return getParent<Capacity>(this);
    }

    @computed
    get View() {
        return getRoot<CapacityBoard>(this).View;
    }

    @computed
    get backgroundColor() {
        if (this.Parent) {
            return this.View.getCellBackground(this.Parent.Stats.ratio);
        }
    }

    @computed
    get displayText() {
        if (!this.Parent) return '';
        if (!this.View.isDragging && this.isHovering) {
            return `${this.Parent.Stats.bookedDuration}t / ${this.Parent.Stats.capacityDuration}t`;
        } else {
            return this.Parent.Stats.ratio === 0
                ? ''
                : this.Parent.Stats.percent + '%';
        }
    }
}
