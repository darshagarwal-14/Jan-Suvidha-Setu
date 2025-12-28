import { UserProfile, Scheme, EligibilityResult } from '../types';

/**
 * DETERMINISTIC ENGINE
 * No AI. No probability.
 * Input: Profile + Scheme Rules
 * Output: Boolean Result + Reasons
 */
export const evaluateEligibility = (profile: UserProfile, schemes: Scheme[]): EligibilityResult[] => {
  return schemes.map(scheme => {
    let isEligible = true;
    const reasons: { en: string; hi: string }[] = [];

    for (const req of scheme.requirements) {
      const userValue = profile[req.field];
      let pass = false;

      // Handle null data (user hasn't answered yet, though validation prevents this in UI)
      if (userValue === null || userValue === undefined) {
        pass = false;
        reasons.push({ en: "Missing info", hi: "जानकारी अनुपलब्ध" });
        isEligible = false;
        continue;
      }

      switch (req.operator) {
        case 'eq':
          pass = userValue === req.value;
          break;
        case 'neq':
          pass = userValue !== req.value;
          break;
        case 'gt':
          pass = (userValue as number) > (req.value as number);
          break;
        case 'gte':
          pass = (userValue as number) >= (req.value as number);
          break;
        case 'lt':
          pass = (userValue as number) < (req.value as number);
          break;
        case 'lte':
          pass = (userValue as number) <= (req.value as number);
          break;
        case 'includes':
          pass = Array.isArray(req.value) && (req.value as any[]).includes(userValue);
          break;
        default:
          pass = false;
      }

      if (!pass) {
        isEligible = false;
        reasons.push(req.description);
      }
    }

    // If eligible, reasons should reflect why (passed all checks)
    if (isEligible) {
        reasons.push({en: "You meet all basic criteria.", hi: "आप सभी बुनियादी मानदंडों को पूरा करते हैं।"});
    }

    return {
      schemeId: scheme.id,
      isEligible,
      reasons,
      missingDocs: scheme.documents // In a full app, we'd check which docs user already has
    };
  });
};
