import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { fetchDIYPrices } from '../services/mockApi';
import { colors, spacing, typography } from '../utils/theme';

export default function HomeSavingsScreen() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchDIYPrices();
      setProjects(data?.projects || []);
      setLastUpdated(new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit'
      }));
    } catch (error) {
      console.error('Error loading DIY projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !projects.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading DIY projects...</Text>
      </View>
    );
  }

  const totalSavings = projects.reduce((sum, project) => {
    const savings = parseFloat(project?.savings || 0);
    return sum + (isNaN(savings) ? 0 : savings);
  }, 0);
  const avgSavings = projects.length > 0 ? Math.round(totalSavings / projects.length) : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Home Savings Calculator</Text>
      <Text style={styles.subtitle}>DIY projects that save you hundreds</Text>

      <View style={styles.updateRow}>
        <Text style={styles.updateText}>Last updated: {lastUpdated}</Text>
        <Pressable onPress={loadProjects}>
          <Text style={styles.refreshText}>↻ Refresh</Text>
        </Pressable>
      </View>

      {/* Savings Overview */}
      <Card style={styles.overviewCard}>
        <Text style={styles.overviewTitle}>🏠 DIY Savings Potential</Text>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${avgSavings}</Text>
            <Text style={styles.statLabel}>Avg per project</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${Math.round(totalSavings).toLocaleString()}</Text>
            <Text style={styles.statLabel}>Do all 10 projects</Text>
          </View>
        </View>
        <Text style={styles.overviewNote}>
          Most projects take just a weekend and save 60-85% vs hiring pros!
        </Text>
      </Card>

      {/* Project Cards */}
      <Text style={styles.sectionTitle}>💪 DIY Projects</Text>
      {projects.map((project, index) => (
        <Pressable
          key={index}
          onPress={() => setSelectedProject(selectedProject === index ? null : index)}
        >
          <Card style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <View style={styles.projectTitleRow}>
                <Text style={styles.projectName}>{project.name}</Text>
                <View style={[
                  styles.difficultyBadge,
                  project.difficulty === 'Easy' && styles.difficultyEasy
                ]}>
                  <Text style={styles.difficultyText}>{project.difficulty}</Text>
                </View>
              </View>
              <View style={styles.savingsRow}>
                <Text style={styles.savingsLabel}>Save:</Text>
                <Text style={styles.savingsAmount}>${project.savings}</Text>
              </View>
            </View>

            <View style={styles.comparisonGrid}>
              <View style={styles.comparisonCol}>
                <Text style={styles.comparisonTitle}>DIY</Text>
                <Text style={styles.comparisonCost}>${project.diy_cost}</Text>
                <Text style={styles.comparisonTime}>{project.diy_time}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.comparisonCol}>
                <Text style={styles.comparisonTitle}>Professional</Text>
                <Text style={styles.comparisonCostPro}>${project.pro_cost}</Text>
                <Text style={styles.comparisonTime}>{project.pro_time}</Text>
              </View>
            </View>

            {selectedProject === index && (
              <View style={styles.expandedSection}>
                <Text style={styles.materialsTitle}>📦 Materials Needed:</Text>
                {project.materials.map((material, i) => (
                  <Text key={i} style={styles.materialItem}>• {material}</Text>
                ))}
                
                <Text style={styles.tipsTitle}>💡 Pro Tips:</Text>
                <Text style={styles.tipsText}>{project.tips}</Text>
              </View>
            )}
          </Card>
        </Pressable>
      ))}

      {/* Cost Savings Calculator */}
      <Card style={styles.calculatorCard}>
        <Text style={styles.calculatorTitle}>🧮 Your Potential Savings</Text>
        <Text style={styles.calculatorDesc}>
          Pick 3 projects this year and save over $1,000+
        </Text>
        <View style={styles.exampleRow}>
          <Text style={styles.exampleLabel}>Example: Paint 2 rooms + Install lights + Build shelves =</Text>
          <Text style={styles.exampleSavings}>$1,305 saved</Text>
        </View>
      </Card>

      {/* Safety Tips */}
      <Card style={styles.safetyCard}>
        <Text style={styles.safetyTitle}>⚠️ Safety First</Text>
        <View style={styles.safetyList}>
          <Text style={styles.safetyItem}>• Always turn off power at breaker for electrical work</Text>
          <Text style={styles.safetyItem}>• Wear safety glasses and gloves</Text>
          <Text style={styles.safetyItem}>• Use proper ladder safety - 3-point contact</Text>
          <Text style={styles.safetyItem}>• Watch YouTube tutorials first</Text>
          <Text style={styles.safetyItem}>• When in doubt, call a pro (plumbing, heavy electrical)</Text>
        </View>
      </Card>

      {/* Resources */}
      <Card style={styles.resourceCard}>
        <Text style={styles.resourceTitle}>📚 Free Learning Resources</Text>
        <Text style={styles.resourceItem}>• YouTube: "This Old House" channel</Text>
        <Text style={styles.resourceItem}>• Home Depot free workshops</Text>
        <Text style={styles.resourceItem}>• Lowe's DIY library</Text>
        <Text style={styles.resourceItem}>• Family Handyman magazine</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md
  },
  loadingText: {
    color: colors.muted,
    fontSize: 14
  },
  updateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm
  },
  updateText: {
    fontSize: 12,
    color: colors.muted
  },
  refreshText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600'
  },
  title: {
    color: colors.text,
    ...typography.title
  },
  subtitle: {
    color: colors.muted,
    ...typography.body,
    marginTop: spacing.xs
  },
  overviewCard: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary + '40'
  },
  overviewTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md
  },
  statItem: {
    alignItems: 'center',
    gap: spacing.xs
  },
  statValue: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '700'
  },
  statLabel: {
    color: colors.muted,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500'
  },
  overviewNote: {
    color: colors.text,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18
  },
  filterRow: {
    gap: spacing.sm
  },
  filterLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600'
  },
  filterBtns: {
    flexDirection: 'row',
    gap: spacing.sm
  },
  filterBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface
  },
  filterBtnText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600'
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: spacing.sm
  },
  projectCard: {
    gap: spacing.md
  },
  projectHeader: {
    gap: spacing.sm
  },
  projectTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  projectName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    flex: 1
  },
  difficultyBadge: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 6
  },
  difficultyEasy: {
    backgroundColor: '#86EFAC'
  },
  difficultyText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '600'
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs
  },
  savingsLabel: {
    color: colors.muted,
    fontSize: 13
  },
  savingsAmount: {
    color: '#10B981',
    fontSize: 20,
    fontWeight: '700'
  },
  comparisonGrid: {
    flexDirection: 'row',
    backgroundColor: colors.primarySoft,
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.md
  },
  comparisonCol: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs
  },
  comparisonTitle: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '600'
  },
  comparisonCost: {
    color: '#10B981',
    fontSize: 18,
    fontWeight: '700'
  },
  comparisonCostPro: {
    color: '#EF4444',
    fontSize: 18,
    fontWeight: '700'
  },
  comparisonTime: {
    color: colors.muted,
    fontSize: 12
  },
  divider: {
    width: 1,
    backgroundColor: colors.border
  },
  expandedSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    gap: spacing.sm
  },
  materialsTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginTop: spacing.xs
  },
  materialItem: {
    color: colors.muted,
    fontSize: 13,
    marginLeft: spacing.sm
  },
  tipsTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginTop: spacing.sm
  },
  tipsText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  calculatorCard: {
    backgroundColor: '#E0F2FE',
    borderColor: '#0EA5E9',
    gap: spacing.sm
  },
  calculatorTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  calculatorDesc: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20
  },
  exampleRow: {
    gap: spacing.xs,
    marginTop: spacing.xs
  },
  exampleLabel: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  exampleSavings: {
    color: '#10B981',
    fontSize: 22,
    fontWeight: '700'
  },
  safetyCard: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444'
  },
  safetyTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.sm
  },
  safetyList: {
    gap: spacing.xs
  },
  safetyItem: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18
  },
  resourceCard: {
    gap: spacing.sm
  },
  resourceTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  resourceItem: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  }
});
