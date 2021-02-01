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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DashboardContainer, StatIcon } from './atoms';


const tsToDate = (ts) => {
  const date = new Date(ts * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();

  return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

const columns = [
  {
    field: 'event',
    name: 'ID',
    sortable: true,
    render: (event) => (
      <EuiLink href={`/incident/${event.id}`}>
        {event.id}
      </EuiLink>
    ),
  },
  {
    field: 'event',
    name: 'Nome',
    sortable: true,
    render: (event) => event.properties.application,
  },
  {
    field: 'event',
    name: 'Mensagem',
    render: (event) => event.properties.message,
  },
  {
    field: 'event',
    name: 'Severidade',
    render: (event) => {
      const color = event.properties.severity < 3 ? 'success' : 'danger';
      return <EuiHealth color={color}>{event.properties.severity}</EuiHealth>;
    },
  },
  {
    field: 'event',
    name: 'Data',
    render: (event) => tsToDate(event.properties.timestamp),
  },
];

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



const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://hackatonxp.brazilsouth.azurecontainer.io:4001/v1/issue")
      .then(response => {
          setData(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleClick = () => {
    axios
      .get("http://hackatonxp.brazilsouth.azurecontainer.io:4001/v1/issue")
      .then(response => {
          setData(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }
  
  return (
      <DashboardContainer>
          <EuiPageHeader>
              <EuiPageHeaderSection>
                  <EuiTitle size="l">
                      <h1>Dashboard</h1>
                  </EuiTitle>
              </EuiPageHeaderSection>
              <EuiPageHeaderSection onClick={handleClick}>
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
                          <EuiTextColor color="secondary">XY% corrigido</EuiTextColor>
                      </EuiStat>
                  </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                  <EuiPanel>
                      <EuiStat
                          title={data.length}
                          description="Incidentes pendentes"
                          titleColor="accent"
                          textAlign="left"
                      />
                  </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                  <EuiPanel>
                      <EuiStat
                          title="XY"
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
              items={data}
              rowHeader="firstName"
              columns={columns}
              rowProps={getRowProps}
              cellProps={getCellProps}
          />

      </DashboardContainer>
  );
}

export default Dashboard;