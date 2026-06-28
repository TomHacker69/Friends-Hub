package com.example.socialmedia.dto;

import java.util.List;

public class CompatibilityResponse {

    private int overallScore;          // 0-100
    private String label;              // "Best Friend", "Great Match", etc.
    private String emoji;              // emoji representation
    private int mutualFriendScore;
    private int locationScore;
    private int interestScore;
    private int interactionScore;
    private int profileScore;
    private int genderScore;
    private List<String> sharedInterests;
    private List<CompatibilityBadge> badges;

    public CompatibilityResponse(int overallScore, String label, String emoji,
                                 int mutualFriendScore, int locationScore,
                                 int interestScore, int interactionScore,
                                 int profileScore, int genderScore,
                                 List<String> sharedInterests,
                                 List<CompatibilityBadge> badges) {
        this.overallScore = overallScore;
        this.label = label;
        this.emoji = emoji;
        this.mutualFriendScore = mutualFriendScore;
        this.locationScore = locationScore;
        this.interestScore = interestScore;
        this.interactionScore = interactionScore;
        this.profileScore = profileScore;
        this.genderScore = genderScore;
        this.sharedInterests = sharedInterests;
        this.badges = badges;
    }

    public int getOverallScore() { return overallScore; }
    public String getLabel() { return label; }
    public String getEmoji() { return emoji; }
    public int getMutualFriendScore() { return mutualFriendScore; }
    public int getLocationScore() { return locationScore; }
    public int getInterestScore() { return interestScore; }
    public int getInteractionScore() { return interactionScore; }
    public int getProfileScore() { return profileScore; }
    public int getGenderScore() { return genderScore; }
    public List<String> getSharedInterests() { return sharedInterests; }
    public List<CompatibilityBadge> getBadges() { return badges; }

    public static class CompatibilityBadge {
        private String id;
        private String label;
        private String emoji;
        private String description;
        private boolean earned;

        public CompatibilityBadge(String id, String label, String emoji, String description, boolean earned) {
            this.id = id;
            this.label = label;
            this.emoji = emoji;
            this.description = description;
            this.earned = earned;
        }

        public String getId() { return id; }
        public String getLabel() { return label; }
        public String getEmoji() { return emoji; }
        public String getDescription() { return description; }
        public boolean isEarned() { return earned; }
    }
}