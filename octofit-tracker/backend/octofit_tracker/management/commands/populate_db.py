from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        for obj in User.objects.all():
            if obj.pk:
                obj.delete()
        for obj in Team.objects.all():
            if obj.pk:
                obj.delete()
        for obj in Activity.objects.all():
            if obj.pk:
                obj.delete()
        for obj in Workout.objects.all():
            if obj.pk:
                obj.delete()
        for obj in Leaderboard.objects.all():
            if obj.pk:
                obj.delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)
        diana = User.objects.create(name='Diana Prince', email='diana@dc.com', team=dc)

        # Create activities
        Activity.objects.create(user=tony, type='Running', duration=30)
        Activity.objects.create(user=steve, type='Cycling', duration=45)
        Activity.objects.create(user=clark, type='Swimming', duration=60)
        Activity.objects.create(user=diana, type='Yoga', duration=50)

        # Create workouts
        workout1 = Workout.objects.create(name='Pushups', description='Do 50 pushups')
        workout2 = Workout.objects.create(name='Situps', description='Do 50 situps')
        workout1.suggested_for.add(tony, steve)
        workout2.suggested_for.add(clark, diana)

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=150)
        Leaderboard.objects.create(team=dc, points=120)

        print('Test data populated successfully.')