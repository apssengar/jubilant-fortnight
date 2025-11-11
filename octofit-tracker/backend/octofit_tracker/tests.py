from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Marvel')
        self.assertEqual(team.name, 'Marvel')

    def test_user_creation(self):
        team = Team.objects.create(name='DC')
        user = User.objects.create(name='Clark Kent', email='clark@dc.com', team=team)
        self.assertEqual(user.name, 'Clark Kent')
        self.assertEqual(user.team.name, 'DC')

    def test_activity_creation(self):
        team = Team.objects.create(name='Marvel')
        user = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=team)
        activity = Activity.objects.create(user=user, type='Running', duration=30)
        self.assertEqual(activity.type, 'Running')
        self.assertEqual(activity.user.name, 'Tony Stark')

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Pushups', description='Do 50 pushups')
        self.assertEqual(workout.name, 'Pushups')

    def test_leaderboard_creation(self):
        team = Team.objects.create(name='Marvel')
        leaderboard = Leaderboard.objects.create(team=team, points=100)
        self.assertEqual(leaderboard.team.name, 'Marvel')
        self.assertEqual(leaderboard.points, 100)
