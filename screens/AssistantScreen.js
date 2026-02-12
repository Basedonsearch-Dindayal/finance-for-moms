import { useMemo, useRef, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radii, spacing, typography } from '../utils/theme';

// Mock AI responses for testing
const getMockResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('grocery') || msg.includes('shopping') || msg.includes('store')) {
    return "Check the Smart Shopping feature! Aldi is 22% cheaper than Whole Foods - that's $55/week saved for a family of 4. Shop Wednesday mornings for the best deals (extra 15% off). Try generic brands - they're 40% cheaper with same quality! 🛒";
  }
  
  if (msg.includes('batch cook') || msg.includes('meal') || msg.includes('cooking')) {
    return "Use the Batch Cooking Planner! Cook 3 lbs of chicken Sunday and use it for 4 meals. Saves $167/week vs takeout for family of 4. That's $715/month you can put in savings! Prep takes 3 hours on Sunday but saves 10+ hours during the week. 🍳";
  }
  
  if (msg.includes('emergency') || msg.includes('fund')) {
    return "Start with $20/week in emergency fund. In 6 months you'll have $520 - that's 1 month of groceries covered! Use ThriveMum's tracker to see your progress. Aim for 3-6 months of expenses. Keep it in a high-yield savings account earning 4.5% interest. 💰";
  }
  
  if (msg.includes('invest') || msg.includes('stock') || msg.includes('market')) {
    return "Start investing with just $50/month! Over 30 years at 7% return, that becomes $60,000. Use the Investment Simulator to see your growth. Open a Roth IRA - tax-free growth! Start with low-cost index funds like VTI. Time in market beats timing the market. 📈";
  }
  
  if (msg.includes('diy') || msg.includes('home') || msg.includes('project')) {
    return "DIY projects save 60-80% vs hiring pros! Paint a room yourself: $45 vs $300. Install new faucet: $80 vs $250. Use the DIY Calculator to see your savings. YouTube has tutorials for everything. Start small - change light fixtures, paint furniture. 🔨";
  }
  
  if (msg.includes('save') || msg.includes('money') || msg.includes('budget')) {
    return "Top 3 quick wins: 1) Switch to generic brands (saves $40/week), 2) Meal prep Sundays (saves $160/week), 3) Shop at Aldi (saves $55/week). That's $255/week = $13,260/year! Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings. 💵";
  }
  
  if (msg.includes('debt') || msg.includes('loan') || msg.includes('credit')) {
    return "Pay off high-interest debt first (credit cards 18-25% APR). Use debt avalanche method - saves most on interest. Pay minimum on all, extra on highest APR. Or snowball method - smallest balance first for motivation. Consider 0% balance transfer cards. Aim to pay 3x minimum payment. 💳";
  }
  
  // Default response
  return "I can help you save money! Ask me about: 🛒 Smart shopping strategies, 🍳 Batch cooking to save $167/week, 💰 Building emergency fund, 📈 Starting to invest with $50/month, 🔨 DIY projects that save thousands, 💵 Quick budgeting tips. What interests you most?";
};

const quickSuggestions = [
  "How can I save on groceries?",
  "Best stores for savings?",
  "How to start investing?",
  "Batch cooking tips?",
  "Build emergency fund?"
];

export default function AssistantScreen() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', text: 'Hi! I\'m your ThriveMum assistant. Ask me anything about saving money, batch cooking, investing, or DIY projects. I give specific, actionable advice!' }
  ]);
  const flatListRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const sendMessage = async (messageText = null) => {
    const text = messageText || input.trim();
    if (!text || loading) return;
    
    setInput('');
    
    // Add user message
    const userMsg = { id: String(Date.now()), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const reply = getMockResponse(text);
      
      // Add assistant response
      setMessages((prev) => [
        ...prev, 
        { id: String(Date.now() + 1), role: 'assistant', text: reply }
      ]);
      
      setLoading(false);
      
      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 800);
  };

  const handleSuggestionPress = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 Smart Assistant</Text>
      <Text style={styles.subtitle}>Your personal finance coach</Text>
      
      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsLabel}>Quick questions:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsScroll}>
            {quickSuggestions.map((suggestion, idx) => (
              <Pressable 
                key={idx} 
                onPress={() => handleSuggestionPress(suggestion)}
                style={styles.suggestionChip}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
            <Text style={[styles.bubbleText, item.role === 'user' && styles.userText]}>{item.text}</Text>
          </View>
        )}
      />
      
      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>✨ Getting specific advice...</Text>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask anything: groceries, investing, DIY..."
          placeholderTextColor={colors.muted}
          style={styles.input}
          multiline
          maxLength={200}
          onSubmitEditing={() => sendMessage()}
          editable={!loading}
        />
        <Pressable 
          onPress={() => sendMessage()} 
          style={[styles.sendButton, !canSend && styles.sendDisabled]}
          disabled={!canSend}
        >
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg
  },
  title: {
    color: colors.text,
    marginBottom: spacing.xs,
    ...typography.title
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    marginBottom: spacing.sm
  },
  suggestionsContainer: {
    marginBottom: spacing.md
  },
  suggestionsLabel: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: spacing.sm,
    fontWeight: '600'
  },
  suggestionsScroll: {
    flexGrow: 0
  },
  suggestionChip: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.lg,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary + '40'
  },
  suggestionText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '500'
  },
  list: {
    gap: spacing.md,
    paddingBottom: spacing.lg
  },
  bubble: {
    padding: spacing.md,
    borderRadius: radii.md,
    maxWidth: '85%'
  },
  assistantBubble: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: 'flex-start'
  },
  userBubble: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end'
  },
  bubbleText: {
    color: colors.text,
    ...typography.body,
    lineHeight: 20
  },
  userText: {
    color: '#FFFFFF'
  },
  loadingContainer: {
    paddingVertical: spacing.sm,
    alignItems: 'center'
  },
  loading: {
    color: colors.primary,
    fontSize: 13,
    fontStyle: 'italic'
  },
  inputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-end',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    color: colors.text,
    ...typography.body,
    maxHeight: 80
  },
  sendButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    minWidth: 70,
    alignItems: 'center'
  },
  sendDisabled: {
    opacity: 0.5
  },
  sendText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14
  }
});
