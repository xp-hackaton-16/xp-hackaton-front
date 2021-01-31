import { useState } from 'react';
import {
    EuiHeader,
    EuiHeaderLogo,
} from '@elastic/eui';

const Header = () => {
    const [position] = useState('static');

    const sections = [
        {
            items: [<EuiHeaderLogo iconType="monitoringApp">Mercurio</EuiHeaderLogo>],
            borders: 'right',
        },
    ];

    return (
        <EuiHeader position={position} sections={sections} />
    );
};

export default Header;