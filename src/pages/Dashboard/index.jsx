import {
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiTitle,
    EuiStat,
    EuiFlexItem,
    EuiFlexGroup,
    EuiPanel,
    EuiBasicTable,
    EuiButton,
    EuiTextColor,
    EuiLink,
    EuiHealth,  
} from '@elastic/eui';
import { DashboardContainer, StatIcon } from './atoms';


const columns = [
  {
    field: 'firstName',
    name: 'First Name',
    sortable: true,
    'data-test-subj': 'firstNameCell',
    mobileOptions: {
      render: (item) => (
        <span>
          {item.firstName}{' '}
          <EuiLink href="#" target="_blank">
            {item.lastName}
          </EuiLink>
        </span>
      ),
      header: false,
      truncateText: false,
      enlarge: true,
      fullWidth: true,
    },
  },
  {
    field: 'lastName',
    name: 'Last Name',
    truncateText: true,
    render: (name) => (
      <EuiLink href={`/incident/${name}`}>
        {name}
      </EuiLink>
    ),
    mobileOptions: {
      show: false,
    },
  },
  {
    field: 'dateOfBirth',
    name: 'Date of Birth',
    dataType: 'date',
  },
  {
    field: 'online',
    name: 'Online',
    dataType: 'boolean',
    render: (online) => {
      const color = online ? 'success' : 'danger';
      const label = online ? 'Online' : 'Offline';
      return <EuiHealth color={color}>{label}</EuiHealth>;
    },
  },
];

const items = [
  {
    id: '1',
    firstName: 'john',
    lastName: 'doe',
    github: 'johndoe',
    dateOfBirth: Date.now(),
    nationality: 'NL',
    online: true
  }  
]

const getRowProps = (item) => {
  const { id } = item;
  return {
    'data-test-subj': `row-${id}`,
    className: 'customRowClass',
    onClick: () => {},
  };
};

const getCellProps = (item, column) => {
  const { id } = item;
  const { field } = column;
  return {
    className: 'customCellClass',
    'data-test-subj': `cell-${id}-${field}`,
    textOnly: true,
  };
};



const Dashboard = () => (
    <DashboardContainer>
        <EuiPageHeader>
            <EuiPageHeaderSection>
                <EuiTitle size="l">
                    <h1>Dashboard</h1>
                </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
                <EuiButton>Atualizar</EuiButton>
            </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiFlexGroup>
            <EuiFlexItem>
                <EuiPanel>
                    <EuiStat
                        title="125"
                        description="Incidentes hoje"
                        textAlign="left">
                        <StatIcon type="check" color="secondary" />
                        <EuiTextColor color="secondary">90% corrigido</EuiTextColor>
                    </EuiStat>
                </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiPanel>
                    <EuiStat
                        title="2,000"
                        description="Incidentes pendentes"
                        titleColor="accent"
                        textAlign="left"
                    />
                </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiPanel>
                    <EuiStat
                        title="88"
                        description="Incidentes críticos"
                        titleColor="danger"
                        textAlign="left"
                    />
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>
        <EuiPageHeader style={{ marginTop: 32 }}>
            <EuiTitle size="m">
                <h1>Incidentes</h1>
            </EuiTitle>
          </EuiPageHeader>
        <EuiBasicTable
            items={items}
            rowHeader="firstName"
            columns={columns}
            rowProps={getRowProps}
            cellProps={getCellProps}
        />

    </DashboardContainer>
);

export default Dashboard;