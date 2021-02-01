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
import { useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { DashboardContainer, StatIcon } from './atoms';


const tsToDate = (ts) => {
  const date = new Date(ts);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.getMonth().toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const columns = [
  {
    name: 'Nome',
    render: (event) => event.properties.application,
  },
  {
    name: 'Mensagem',
    render: (event) => event.properties.message,
  },
  {
    name: 'Severidade',
    render: (event) => {
      const color = event.properties.severity < 3 ? 'success' : 'danger';
      return <EuiHealth color={color}>{event.properties.severity}</EuiHealth>;
    },
  },
  {
    name: 'Data',
    render: (event) => tsToDate(event.properties.timestamp),
  },
];

const getCellProps = (item, column) => {
  const { id } = item;
  const { field } = column;
  return {
    className: 'customCellClass',
    textOnly: true,
  };
};

const Dashboard = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  const loadIssues = () => {
    axios
      .get("http://hackatonxp.brazilsouth.azurecontainer.io:4001/v1/issue")
      .then(response => {
          setData(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    loadIssues();
  }, []);

  const getRowProps = useCallback((item) => {
    const { id } = item;
    return {
      className: 'customRowClass',
      onClick: (...args) => {
        history.push(`/incident/${id}`)
        console.log(...args);
      },
    };
  }, [history]);
  
  return (
      <DashboardContainer>
          <EuiPageHeader>
              <EuiPageHeaderSection>
                  <EuiTitle size="l">
                      <h1>Dashboard</h1>
                  </EuiTitle>
              </EuiPageHeaderSection>
              <EuiPageHeaderSection onClick={loadIssues}>
                  <EuiButton>Atualizar</EuiButton>
              </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiFlexGroup>
              <EuiFlexItem>
                  <EuiPanel>
                      <EuiStat
                          title={data.length}
                          description="Incidentes hoje"
                          textAlign="left">
                          <StatIcon type="check" color="secondary" />
                          <EuiTextColor color="secondary">0% corrigido</EuiTextColor>
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
                          title="0"
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