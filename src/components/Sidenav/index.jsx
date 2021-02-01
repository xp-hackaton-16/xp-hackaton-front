
import { useState } from 'react';
import { EuiIcon, EuiSideNav } from '@elastic/eui';

const Sidenav = () => {
    const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
    const [selectedItemName, setSelectedItem] = useState(null);

    const toggleOpenOnMobile = () => {
        setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
    };

    const selectItem = (name) => {
        setSelectedItem(name);
    };

    const createItem = (name, data = {}) => {
        // NOTE: Duplicate `name` values will cause `id` collisions.
        return {
            ...data,
            id: name,
            name,
            isSelected: selectedItemName === name,
            onClick: () => selectItem(name),
            href: "/"
        };
    };

    const sideNav = [
        createItem('Monitoramento', {
            items: [
                createItem('Dashboard', {
                    icon: <EuiIcon type="visualizeApp" />
                }),
            ],
        }),
    ];

    return (
        <EuiSideNav
            mobileTitle="Navigate within $APP_NAME"
            toggleOpenOnMobile={toggleOpenOnMobile}
            isOpenOnMobile={isSideNavOpenOnMobile}
            items={sideNav}
            style={{ width: 192 }}
        />
    );
};

export default Sidenav;