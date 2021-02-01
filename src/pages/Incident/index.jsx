import React, { useCallback, useEffect, useState } from 'react';
import {
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiButton,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';
import axios from 'axios';
import { DashboardContainer } from '../Dashboard/atoms';
import { ElipsisText, List, ListItem, Subtitle } from './atoms';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });

  const loadIssues = useCallback(() => {
    axios
      .get(`http://hackatonxp.brazilsouth.azurecontainer.io:4001/v1/issue/${params.id}`)
      .then(response => {
          setData(response.data);

          const parents = response.data.filter(x => x.related.length > 0);
          const edges = [];

          for (const item of parents) {
            edges.push(...item.related.map(x => ({
              from: item.event.id,
              to: x
            })));
          }

          setGraphData({
            nodes: response.data.map(x => ({
              id: x.event.id,
              application: x.event.properties.application,
              message: x.event.properties.message
            })),
            edges,
          });
      })
      .catch(err => {
        console.error(err);
      });
  }, [params.id, setGraphData, setData]);

  useEffect(() => {
    setInterval(() => loadIssues(), 2000);
  }, [])

  useEffect(() => {
    document.getElementById('chart').innerHTML = '';
    window.writechart("chart", graphData);
  }, [graphData]);

  const handleClick = () => {
    setData({ nodes: [...data.nodes, { id: "B" }], edges: data.edges});
  };

  console.log(data);
  const root = data[0];

  return (
    <DashboardContainer>
        <EuiPageHeader>
            <EuiPageHeaderSection>
                <EuiTitle size="l">
                  {!!root ? <ElipsisText>
                    Issue ({root.event.id}): {root.event.properties.application}
                    <Subtitle>{root.event.properties.message}</Subtitle>
                  </ElipsisText> : <ElipsisText>Issue</ElipsisText>}
                </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
                <EuiButton>Atualizar</EuiButton>
            </EuiPageHeaderSection>
        </EuiPageHeader>

        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiTitle>
              <h2>Event Relationship</h2>
            </EuiTitle>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <div id="chart" style={{ height: 270 }}></div>
          </EuiPageContentBody>
        </EuiPageContent>

        <EuiSpacer size="m" />

        <EuiFlexGroup>
          <EuiFlexItem grow={2}>
            <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>Related Issues</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <List>
                {data.slice(1).map(x => (
                  <ListItem key={x.event.id}><strong>{x.event.properties.application}</strong> - {x.event.properties.message}</ListItem>
                ))}
              </List>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiFlexItem>
        <EuiFlexItem grow={8}>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>Suggested Solution</h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <p>TODO</p>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiFlexItem>
      </EuiFlexGroup>
    </DashboardContainer>
  )
};
