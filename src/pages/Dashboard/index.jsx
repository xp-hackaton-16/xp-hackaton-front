import {
    EuiPageHeader,
    EuiPageHeaderSection,
    EuiTitle,
    EuiStat,
    EuiFlexItem,
    EuiFlexGroup,
    EuiPanel,
    EuiIcon,
    EuiButton,
    EuiTextColor,
    EuiLink,
} from '@elastic/eui';
import { DashboardContainer, StatIcon } from './atoms';

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
                        textAlign="left">
                        <EuiLink color="accent">Ver todos</EuiLink>
                    </EuiStat>
                </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiPanel>
                    <EuiStat
                        title="88"
                        description="Incidentes críticos"
                        titleColor="danger"
                        textAlign="left">
                        <EuiLink color="danger">Ver todos</EuiLink>
                    </EuiStat>
                </EuiPanel>
            </EuiFlexItem>
        </EuiFlexGroup>
    </DashboardContainer>
);

export default Dashboard;