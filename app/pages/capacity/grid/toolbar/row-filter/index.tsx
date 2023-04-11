import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useMenuState } from '~/src/hooks/useMenu';
import RowFilterMenu from './menu';
import RowFilterAction from './RowFilterAction';

const RowFilter = observer(() => {

    const {handleOpen, ...menuProps} = useMenuState()

    return (
        <>
            <RowFilterAction handleOpen={handleOpen} />
            <RowFilterMenu
                {...menuProps}
            />
        </>
    );
});

export default RowFilter;
